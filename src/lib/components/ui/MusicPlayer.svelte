<script lang="ts">
    import type { Track } from '$lib/types';
    import { tick } from 'svelte';
  
    // --- PROPS ---
    export let tracks: Track[] = [];
  
    // --- STATE ---
    let currentTrackIndex = 0;
    let audio: HTMLAudioElement;
    let playing = false;
    let progress = 0;
    let duration = 0;
    let currentTime = 0; // Added for reliable time display
    let volume = 1;
    let repeat = false;
    let shuffle = false;
  
    // --- CORE FUNCTIONS ---
  
    // Play a track by its index in the array
    async function playTrack(index: number) {
      currentTrackIndex = index;
      // Wait for Svelte to process state changes
      await tick();
  
      if (audio && tracks[index]) {
        audio.src = tracks[index].src;
        // The audio.play() method returns a promise
        try {
          await audio.play();
          playing = true;
        } catch (error) {
          console.error("Playback was prevented.", error);
          playing = false; // Update the UI if autoplay is blocked
        }
      }
    }
  
// Replace your old togglePlay function with this new one
async function togglePlay() {
  // Guard against no tracks available
  if (tracks.length === 0) return;

  // If a track is currently playing, pause it.
  if (playing) {
    audio.pause();
    playing = false;
    return;
  }

  // If we get here, it means we need to start playing.
  // Check if a source is loaded in the audio element.
  if (!audio.src || audio.src !== tracks[currentTrackIndex].src) {
    // If no source is loaded OR the source is wrong,
    // call playTrack to load and play the current track.
    await playTrack(currentTrackIndex);
  } else {
    // Otherwise, the correct track is loaded and just paused, so resume.
    try {
      await audio.play();
      playing = true;
    } catch (error) {
      console.error("Playback was prevented.", error);
      playing = false;
    }
  }
}
  
    function nextTrack() {
      if (tracks.length === 0) return;
      if (shuffle) {
        let next;
        do {
          next = Math.floor(Math.random() * tracks.length);
        } while (next === currentTrackIndex && tracks.length > 1);
        playTrack(next);
      } else if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
      } else if (repeat) {
        playTrack(0);
      } else {
        playing = false;
      }
    }
  
    function prevTrack() {
      if (!audio) return;
      // If more than 3 seconds in, restart the track. Otherwise, go to previous.
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
      } else if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
      }
    }
  
    // --- UI HANDLERS ---
    
    // Fired when the user interacts with the seek bar
    function seek(e: Event) {
      if (!audio || isNaN(duration) || duration === 0) return;
      const target = e.target as HTMLInputElement;
      const newTime = (Number(target.value) / 100) * duration;
      audio.currentTime = newTime;
    }
  
    function setVolume(e: Event) {
      if (!audio) return;
      const target = e.target as HTMLInputElement;
      volume = Number(target.value);
      audio.volume = volume;
    }
    
    function formatTime(seconds: number) {
      if (isNaN(seconds)) return "0:00";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  
    // --- AUDIO ELEMENT EVENT HANDLERS ---
  
    // Fires when the audio's metadata (like duration) is loaded
    function handleLoadedMetadata() {
      if (!audio) return;
      duration = audio.duration;
    }
  
    // Fires repeatedly as the audio plays
    function handleTimeUpdate() {
      if (!audio) return;
      currentTime = audio.currentTime;
      // Prevent division by zero if duration isn't ready
      if (duration > 0) {
        progress = (currentTime / duration) * 100;
      }
    }
  
    // Fires when the track finishes playing
    function handleEnded() {
      nextTrack();
    }
    
    // Helper to safely get the current track object
    $: currentTrack = tracks[currentTrackIndex] || {};
  </script>

  <!-- <div class="music-player">
    {#if tracks.length > 0}
      <div class="track-info">
        <img
          src={currentTrack.cover || "/images/default-cover.png"}
          alt="Album Cover"
          class="cover-art"
        />
        <h2>{currentTrack.title || "Unknown Title"}</h2>
        <p>{currentTrack.artist || "Unknown Artist"}</p>
      </div>
  
      <div class="controls">
        <button on:click={prevTrack} disabled={currentTrackIndex === 0}
          >&laquo;</button
        >
        <button on:click={togglePlay}>{playing ? "❚❚" : "▶"}</button>
        <button on:click={nextTrack}>&raquo;</button>
      </div>
  
      <div class="seek-bar">
        <span>{formatTime(currentTime)}</span>
        
        <input
          type="range"
          min="0"
          max="100"
          value={progress || 0}
          on:input={seek}
        />
        <span>{formatTime(duration || 0)}</span>
      </div>
  
      <div class="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={volume}
          on:input={setVolume}
        />
      </div>
  
      <div class="shuffle-repeat">
        <button on:click={() => (shuffle = !shuffle)} class:active={shuffle}>
          Shuffle
        </button>
        <button on:click={() => (repeat = !repeat)} class:active={repeat}>
          Repeat
        </button>
      </div>
  
      <div class="track-list">
        <h3>Playlist</h3>
        <ul>
          {#each tracks as track, i}
            <li
              on:click={() => playTrack(i)}
              class:active={i === currentTrackIndex}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === "Enter" && playTrack(i)}
            >
              {track.title} - {track.artist}
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <p>No tracks loaded.</p>
    {/if}
  
    <audio
      bind:this={audio}
      on:timeupdate={handleTimeUpdate}
      on:loadedmetadata={handleLoadedMetadata}
      on:ended={handleEnded}
    />
  </div>
  <style>
    /* Use CSS variables for easy theme customization */
    :root {
      --player-bg: #1e1e1e;
      --text-primary: #e0e0e0;
      --text-secondary: #a0a0a0;
      --border-color: #333;
      --hover-bg: #2a2a2a;
      --active-bg: #3c3c3c;
      --accent-color: #4a90e2;
    }
  
    .music-player {
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
        sans-serif;
      color: var(--text-primary);
      background-color: var(--player-bg);
      background: rgba(36, 12, 8, 0.85);
      backdrop-filter: blur(12px) saturate(1.2);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
      max-width: 400px;
      margin: 2rem auto;
      padding: 1.5rem;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }
  
    /* --- Track Info & Cover Art --- */
    .track-info {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .track-info h2 {
      margin: 0.5rem 0 0.25rem;
      font-size: 1.25rem;
    }
    .track-info p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .cover-art {
      width: 150px;
      height: 150px;
      border-radius: 8px;
      margin-bottom: 1rem;
      object-fit: cover;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  
    /* --- Buttons --- */
    .controls,
    .shuffle-repeat {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .controls button {
      font-size: 1.5rem;
      width: 50px;
      height: 50px;
      border-radius: 50%; /* Make controls circular */
      border: none;
      background-color: var(--hover-bg);
      color: var(--text-primary);
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .shuffle-repeat button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background-color: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 20px; /* Pill-shaped buttons */
      transition: all 0.2s;
    }
    .controls button:hover,
    .shuffle-repeat button:hover {
      background-color: var(--active-bg);
    }
    .shuffle-repeat button.active {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      color: white;
    }
  
    /* --- Sliders (Seek & Volume) --- */
    .seek-bar,
    .volume-control {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      flex-grow: 1;
      cursor: pointer;
      background: transparent;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background: #444;
      height: 4px;
      border-radius: 2px;
    }
    input[type="range"]::-moz-range-track {
      background: #444;
      height: 4px;
      border-radius: 2px;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: -6px; /* Center thumb on track */
      width: 16px;
      height: 16px;
      background: var(--text-primary);
      border-radius: 50%;
    }
    input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 16px;
      background: var(--text-primary);
      border-radius: 50%;
      border: none;
    }
  
    /* --- Track List --- */
    .track-list h3 {
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 1rem;
      color: var(--text-secondary);
    }
    .track-list ul {
      list-style: none;
      padding: 0;
      max-height: 150px;
      overflow-y: auto;
    }
    .track-list li {
      padding: 0.75rem;
      cursor: pointer;
      border-radius: 5px;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s;
    }
    .track-list li:hover {
      background-color: var(--hover-bg);
    }
    .track-list li.active {
      background-color: var(--accent-color);
      color: white;
      font-weight: bold;
    }
  
    /* Hide the actual audio element */
    audio {
      display: none;
    }
  </style>
   -->

   <div class="mini-player">
    {#if tracks.length > 0}
      <img
        src={currentTrack.cover || '/images/default-cover.png'}
        alt="Album Cover"
        class="cover-art"
      />
  
      <div class="player-details">
        <div class="text-info">
          <p class="title">{currentTrack.title || 'Unknown Title'}</p>
          <p class="artist">{currentTrack.artist || 'Unknown Artist'}</p>
        </div>
  
        <div class="seek-bar">
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            on:input={seek}
          />
          <div class="timings">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>
  
        <div class="controls">
          <button on:click={prevTrack} title="Previous">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </button>
  
          <button class="play-pause-btn" on:click={togglePlay} title={playing ? 'Pause' : 'Play'}>
            {#if playing}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            {:else}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            {/if}
          </button>
  
          <button on:click={nextTrack} title="Next">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </button>
        </div>
      </div>
  
    {:else}
      <p>No tracks loaded.</p>
    {/if}
  
    <audio
      bind:this={audio}
      on:timeupdate={handleTimeUpdate}
      on:loadedmetadata={handleLoadedMetadata}
      on:ended={handleEnded}
    />
  </div>

  <style>
    :root {
      --player-bg: #1e1e1e;
      --text-primary: #e0e0e0;
      --text-secondary: #a0a0a0;
      --border-color: #333;
      --accent-color: #1db954;
    }
  
    /* Main container for the standalone player */
    .mini-player {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: var(--player-bg);
      padding: 1rem;
      border-radius: 8px;
      max-width: 600px;
      margin: 2rem auto; /* Center the player on the page */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
  
    /* Left Column: Artwork */
    .cover-art {
      width: 200px;
      height: 150px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0; /* Prevents image from shrinking */
    }
  
    /* Right Column: All details */
    .player-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      min-width: 0; /* Prevents flexbox overflow */
    }
  
    .text-info {
      margin-bottom: 0.75rem;
    }
    .text-info .title {
      color: var(--text-primary);
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .text-info .artist {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin: 4px 0 0 0;
    }
  
    /* --- Seek Bar --- */
    .seek-bar {
      width: 100%;
      margin-bottom: 0.75rem;
    }
    .timings {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: var(--text-secondary);
      margin-top: 4px;
    }
  
    /* --- Controls --- */
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
    }
    .controls button {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 0;
      transition: color 0.2s;
    }
    .controls button:hover {
      color: var(--text-primary);
    }
    .play-pause-btn {
      background-color: var(--accent-color);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    .play-pause-btn:hover {
      color: white;
      transform: scale(1.1);
    }
  
    /* --- Slider Styles --- */
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      cursor: pointer;
      background: transparent;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background: #4d4d4d;
      height: 4px;
      border-radius: 2px;
    }
    input[type="range"]::-moz-range-track {
      background: #4d4d4d;
      height: 4px;
      border-radius: 2px;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: -4px;
      width: 12px;
      height: 12px;
      background: var(--text-primary);
      border-radius: 50%;
    }
  
    /* Hide the actual audio element */
    audio {
      display: none;
    }
  </style>