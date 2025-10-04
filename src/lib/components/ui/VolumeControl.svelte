<script lang="ts">
    import { playerState, setVolume } from '$lib/stores/playerStore';
    import { derived } from 'svelte/store';
  
    const volume = derived(playerState, $state => $state.volume);
  </script>
  
  <div class="flex items-center gap-2 w-full">
    <span>🔊</span>
    <input type="range" min="0" max="1" step="0.01" bind:value={$volume} on:input={(e) => setVolume(+e.target.value)} class="flex-1 accent-gold-500 h-1 rounded-lg" />
  </div>
  