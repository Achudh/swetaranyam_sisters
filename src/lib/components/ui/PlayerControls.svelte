<script lang="ts">
    import { playerState, togglePlay, nextTrack, prevTrack, toggleRepeat, toggleShuffle } from '$lib/stores/playerStore';
    import { derived } from 'svelte/store';
  
    const playing = derived(playerState, $state => $state.playing);
    const repeat = derived(playerState, $state => $state.repeat);
    const shuffle = derived(playerState, $state => $state.shuffle);
  </script>
  
  <div class="flex items-center justify-center gap-6 mb-4">
    <button on:click={toggleShuffle} class="text-xl">{$shuffle ? 'S' : 's'}</button>
    <button on:click={prevTrack} class="text-3xl">&#9198;</button>
    <button on:click={togglePlay} class="text-4xl">{$playing ? '||' : '▶'}</button>
    <button on:click={nextTrack} class="text-3xl">&#9197;</button>
    <button on:click={toggleRepeat} class="text-xl">{$repeat ? 'R' : 'r'}</button>
  </div>
  