<!-- <script lang="ts">
const tracks = [
  {
    title: 'Preview',
    artist: 'Swetaranyam Sisters',
    src: '/audio/Preview.wav',
    cover: '/images/AKF_0021.jpg',
    duration: null
  }
];

let current = 0;
let audio: HTMLAudioElement;
let playing = false;
let progress = 0;
let duration = 0;
let volume = 1;
let repeat = false;
let shuffle = false;

function playTrack(idx: number) {
  current = idx;
  audio.src = tracks[current].src;
  audio.play();
  playing = true;
}

function togglePlay() {
  if (playing) {
    audio.pause();
    playing = false;
  } else {
    audio.play();
    playing = true;
  }
}

function nextTrack() {
  if (shuffle) {
    let next;
    do {
      next = Math.floor(Math.random() * tracks.length);
    } while (next === current && tracks.length > 1);
    playTrack(next);
  } else if (current < tracks.length - 1) {
    playTrack(current + 1);
  } else if (repeat) {
    playTrack(0);
  }
}

function prevTrack() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else if (current > 0) {
    playTrack(current - 1);
  } else if (repeat) {
    playTrack(tracks.length - 1);
  }
}

function onTimeUpdate() {
  progress = audio.currentTime;
  duration = audio.duration;
}

function onLoadedMetadata() {
  duration = audio.duration;
  tracks[current].duration = duration;
}

function seek(e: Event) {
  const input = e.target as HTMLInputElement;
  audio.currentTime = +input.value;
}

function setVolume(e: Event) {
  const input = e.target as HTMLInputElement;
  volume = +input.value;
  audio.volume = volume;
}

function toggleRepeat() {
  repeat = !repeat;
}

function toggleShuffle() {
  shuffle = !shuffle;
}

function onEnded() {
  if (repeat || shuffle || current < tracks.length - 1) {
    nextTrack();
  } else {
    playing = false;
  }
}
</script>

<style>
.music-player-bg {
  background: linear-gradient(135deg, #3b0d0c 0%, #7c2d12 100%);
  /* min-height: 75vh; */
}
.music-player-glass {
  background: rgba(36, 12, 8, 0.85);
  backdrop-filter: blur(12px) saturate(1.2);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
}
.track-active {
  background: linear-gradient(90deg, #fbbf24 0%, #7c2d12 100%);
  color: #3b0d0c;
}
.track-hover:hover {
  background: rgba(251,191,36,0.08);
}
@media (max-width: 768px) {
  .music-player-bg { padding: 0; }
  .music-player-glass { border-radius: 0; }
}
</style>

<div class="music-player-bg flex flex-col items-center justify-center py-10 px-2">
  <div class="p-8 w-full max-w-3xl music-player-glass rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
    
    <div class="md:w-1/3 w-full bg-maroon-800/80 p-4 flex flex-col gap-2 scrollbar-hide" style="max-height:400px;overflow-y:auto;">
      <h2 class="text-gold-200 font-bold text-lg mb-2">Tracks</h2>
      {#each tracks as track, i}
        <div class="flex items-center gap-3 p-2 rounded-lg cursor-pointer track-hover {current === i ? 'track-active' : ''}"
          on:click={() => playTrack(i)}>
          <img src={track.cover} alt="cover" class="w-10 h-10 rounded object-cover shadow" />
          <div class="flex-1">
            <div class="text-amber-50 font-semibold">{track.title}</div>
            <div class="text-amber-50 text-xs">{track.artist}</div>
          </div>
          {#if current === i && playing}
            <span class="text-gold-400 animate-pulse mx-8">&#9654;</span>
            <span class="opacity-0">&#9654;</span>
          {/if}
        </div>
      {/each}
    </div>
    
    <div class="flex-1 flex flex-col items-center justify-between p-6">
      <img src={tracks[current].cover} alt="cover" class="w-40 h-40 rounded-xl object-cover mb-4 shadow-lg" />
      <div class="text-center mb-2">
        <div class="text-amber-50 text-xl font-bold">{tracks[current].title}</div>
        <div class="text-amber-100/80 text-sm">{tracks[current].artist}</div>
      </div>
      <audio
        bind:this={audio}
        src={tracks[current].src}
        on:timeupdate={onTimeUpdate}
        on:loadedmetadata={onLoadedMetadata}
        on:ended={onEnded}
        on:play={() => playing = true}
        on:pause={() => playing = false}
        class="hidden"
      />
      
      <div class="w-full flex items-center gap-2 mb-2">
        <span class="text-xs text-amber-100/60 w-12 text-right">{Math.floor(progress/60)}:{(Math.floor(progress)%60).toString().padStart(2,'0')}</span>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={progress}
          on:input={seek}
          class="flex-1 accent-gold-500 h-1 rounded-lg"
        />
        <span class="text-xs text-amber-100/60 w-12 text-left">{Math.floor(duration/60)}:{(Math.floor(duration)%60).toString().padStart(2,'0')}</span>
      </div>
      
      <div class="flex items-center justify-center gap-6 mb-4">
        <button on:click={toggleShuffle} class="text-xl" aria-label="Shuffle" title="Shuffle">
          <svg width="24" height="24" fill="none" stroke={shuffle ? '#fbbf24' : '#fef3c7'} stroke-width="2"><path d="M4 4l16 16M4 20l16-16"/></svg>
        </button>
        <button on:click={prevTrack} class="text-3xl text-gold-400" aria-label="Previous" title="Previous Track">&#9198;</button>
        <button on:click={togglePlay} class="text-4xl bg-gold-600 text-maroon-900 rounded-full w-24 h-24 flex items-center justify-center shadow-lg" aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause' : 'Play'}>
          {#if playing}
            &#10073;&#10073;
          {:else}
            &#9654;
          {/if}
        </button>
        <button on:click={nextTrack} class="text-3xl text-gold-400" aria-label="Next" title="Next Track">&#9197;</button>
        <button on:click={toggleRepeat} class="text-xl" aria-label="Repeat" title="Repeat">
        
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" fill="none" stroke={repeat ? '#fbbf24' : '#fef3c7'} stroke-width="2" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:#fef3c7;}
                </style>
                <g>
                    <path class="st0" d="M466.882,147.076c-27.803-27.841-66.446-45.126-108.916-45.118H303.14l11.207-26.64   c1.148-2.724,0.459-5.863-1.715-7.854c-2.174-1.99-5.359-2.404-7.976-1.026l-93.422,49.39c-2.297,1.202-3.72,3.582-3.72,6.162   c0,2.588,1.424,4.968,3.72,6.163l93.422,49.397c2.602,1.378,5.786,0.965,7.976-1.018c2.174-1.99,2.864-5.136,1.715-7.854   l-11.222-26.671h54.84c31.539,0.016,59.908,12.731,80.593,33.392c20.668,20.684,33.376,49.061,33.391,80.6   c-0.016,31.54-12.723,59.909-33.391,80.601c-20.684,20.66-49.054,33.376-80.593,33.391v40.051   c42.47,0.008,81.113-17.277,108.916-45.119C494.73,337.113,512.016,298.478,512,256   C512.016,213.522,494.73,174.887,466.882,147.076z"/>
                    <path class="st0" d="M300.767,383.847l-93.422-49.398c-2.602-1.377-5.787-0.964-7.977,1.018c-2.174,1.99-2.863,5.137-1.714,7.854   l11.222,26.67h-54.841c-31.538-0.015-59.908-12.73-80.592-33.391C52.774,315.908,40.067,287.539,40.052,256   c0.016-31.538,12.723-59.916,33.391-80.6c20.684-20.661,49.054-33.376,80.592-33.392v-40.05   c-42.47-0.008-81.112,17.277-108.916,45.118C17.27,174.887-0.015,213.522,0,256c-0.015,42.478,17.27,81.113,45.119,108.924   c27.803,27.842,66.446,45.127,108.916,45.119h54.826l-11.207,26.639c-1.148,2.726-0.459,5.864,1.714,7.855   c2.174,1.99,5.359,2.403,7.977,1.025l93.422-49.39c2.296-1.203,3.72-3.583,3.72-6.163   C304.488,387.422,303.063,385.041,300.767,383.847z"/>
                </g>
                </svg>
        </button>
      </div>
      
      <div class="flex items-center gap-2 w-full">
        <svg width="20" height="20" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
        <input type="range" min="0" max="1" step="0.01" value={volume} on:input={setVolume} class="flex-1 accent-gold-500 h-1 rounded-lg" title="Volume" />
      </div>
    </div>
  </div>
</div> 

-->

<!-- <style>
  /* Styles remain the same as the previous version */
  .music-player {
    font-family: sans-serif;
    max-width: 400px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .track-info {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .cover-art {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-bottom: 1rem;
    object-fit: cover;
  }
  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .controls button {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #eee;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s;
  }
  .controls button:hover {
    background-color: #ddd;
  }
  .controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .seek-bar,
  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input[type="range"] {
    flex-grow: 1;
    cursor: pointer;
  }
  .shuffle-repeat {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .shuffle-repeat button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background-color: transparent;
    cursor: pointer;
    border-radius: 5px;
  }
  .shuffle-repeat button.active {
    background-color: #a3d3ff;
    border-color: #7abfff;
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
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
  }
  .track-list li:hover {
    background-color: #f0f0f0;
  }
  .track-list li.active {
    background-color: #ddd;
    font-weight: bold;
  }
  audio {
    display: none;
  }
</style> -->

<svelte:head>
  <title>Music | Swetaranyam Sisters</title>
  <meta
    name="description"
    content="Carnatic music performances by Swetaranyam Sisters across India and internationally."
  />
</svelte:head><script lang="ts">
    import MusicPlayer from "../../lib/components/ui/MusicPlayer.svelte";
    import type { Track } from "../../lib/types";

  // 1. Import the MusicPlayer component and the Track type

  // 2. Define your playlist as a constant
  //    Ensure the `src` and `cover` paths are correct.
  //    These files must be in your project's `/static` folder.
  const myPlaylist: Track[] = [
    {
      title: "Preview",
      artist: "Swetaranyam Sisters",
      src: "/audio/Preview.wav",      // Corresponds to /static/audio/Preview.wav
      cover: "/images/AKF_0021.jpg",  // Corresponds to /static/images/AKF_0021.jpg
    }
  ];
</script>

<main>
  <MusicPlayer tracks={myPlaylist} />

</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
