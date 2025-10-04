<script lang="ts">
    import { playerState, seek } from '$lib/stores/playerStore';
    import { derived } from 'svelte/store';

    const progress = derived(playerState, $state => $state.progress);
    const duration = derived(playerState, $state => $state.duration);
</script>

<div class="w-full flex items-center gap-2 mb-2">
    <span class="text-xs text-amber-100/60 w-12 text-right">
        {Math.floor($progress/60)}:{(Math.floor($progress)%60).toString().padStart(2,'0')}
    </span>
    <input type="range" min="0" max={$duration || 1} step="0.1" bind:value={$progress} on:input={(e) => seek(+e.target.value)} class="flex-1 accent-gold-500 h-1 rounded-lg" />
    <span class="text-xs text-amber-100/60 w-12 text-left">
        {Math.floor($duration/60)}:{(Math.floor($duration)%60).toString().padStart(2,'0')}
    </span>
</div>
