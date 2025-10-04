<script lang="ts">
    import { tracks, playerState, playTrack } from '$lib/stores/playerStore';
    import { derived } from 'svelte/store';

    export let pageTracks = [];
    export let client = false;

    const current = derived(playerState, $state => $state.current);
    const playing = derived(playerState, $state => $state.playing);
</script>

<div class="md:w-1/3 w-full bg-maroon-800/80 p-4 flex flex-col gap-2 scrollbar-hide" style="max-height:400px;overflow-y:auto;">
    <h2 class="text-gold-200 font-bold text-lg mb-2">Tracks</h2>
    {#each pageTracks as track, i}
        <div
            class="flex items-center gap-3 p-2 rounded-lg cursor-pointer track-hover { $current === i ? 'track-active' : '' }"
            on:click={() => playTrack(i)}
        >
            <img src={track.cover} alt="cover" class="w-10 h-10 rounded object-cover shadow" />
            <div class="flex-1">
                <div class="text-amber-50 font-semibold">{track.title}</div>
                <div class="text-amber-50 text-xs">{track.artist}</div>
            </div>
            {#if client && $current === i && $playing}
                <span class="text-gold-400 animate-pulse mx-8">&#9654;</span>
                <span class="opacity-0">&#9654;</span>
            {/if}
        </div>
    {/each}
</div>
