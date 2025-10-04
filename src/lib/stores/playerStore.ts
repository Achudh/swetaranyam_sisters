import { writable, get } from 'svelte/store';
import type { Track } from '$lib/utils/PlayerLogic';

// ------------------------
// Player State Interface
// ------------------------
export interface PlayerState {
  current: number;
  playing: boolean;
  progress: number;
  duration: number;
  volume: number;
  repeat: boolean;
  shuffle: boolean;
}

// ------------------------
// Default Player State
// ------------------------
export const defaultPlayerState: PlayerState = {
  current: 0,
  playing: false,
  progress: 0,
  duration: 0,
  volume: 1,
  repeat: false,
  shuffle: false
};

// ------------------------
// Writable Stores
// ------------------------
export const playerState = writable<PlayerState>({ ...defaultPlayerState });
export const tracks = writable<Track[]>([]);              // Current page tracks
export const audioStore = writable<HTMLAudioElement>(null); // Audio element reference

// ------------------------
// Player Functions
// ------------------------

// Play a specific track
export function playTrack(idx: number) {
  const audio = get(audioStore);
  const trackList = get(tracks);
  if (!audio || trackList.length === 0) return;

  playerState.update(state => ({ ...state, current: idx, playing: true }));
  audio.src = trackList[idx].src;
  audio.play();
}

// Toggle play/pause
export function togglePlay() {
  const audio = get(audioStore);
  if (!audio) return;

  playerState.update(state => {
    if (state.playing) {
      audio.pause();
      return { ...state, playing: false };
    } else {
      audio.play();
      return { ...state, playing: true };
    }
  });
}

// Next track
export function nextTrack() {
  const state = get(playerState);
  const trackList = get(tracks);
  if (trackList.length === 0) return;

  let next: number;

  if (state.shuffle) {
    do {
      next = Math.floor(Math.random() * trackList.length);
    } while (next === state.current && trackList.length > 1);
  } else if (state.current < trackList.length - 1) {
    next = state.current + 1;
  } else if (state.repeat) {
    next = 0;
  } else {
    return; // No next track
  }

  playTrack(next);
}

// Previous track
export function prevTrack() {
  const audio = get(audioStore);
  const state = get(playerState);
  const trackList = get(tracks);
  if (!audio || trackList.length === 0) return;

  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else if (state.current > 0) {
    playTrack(state.current - 1);
  } else if (state.repeat) {
    playTrack(trackList.length - 1);
  }
}

// Toggle shuffle
export function toggleShuffle() {
  playerState.update(state => ({ ...state, shuffle: !state.shuffle }));
}

// Toggle repeat
export function toggleRepeat() {
  playerState.update(state => ({ ...state, repeat: !state.repeat }));
}

// Set volume
export function setVolume(vol: number) {
  const audio = get(audioStore);
  if (!audio) return;

  audio.volume = vol;
  playerState.update(state => ({ ...state, volume: vol }));
}

// Seek
export function seek(time: number) {
  const audio = get(audioStore);
  if (!audio) return;

  audio.currentTime = time;
  playerState.update(state => ({ ...state, progress: time }));
}

// Audio event handlers (to bind in <audio>)
export function onTimeUpdateGlobal() {
  const audio = get(audioStore);
  if (!audio) return;

  playerState.update(state => ({ ...state, progress: audio.currentTime, duration: audio.duration }));
}

export function onLoadedMetadataGlobal() {
  const audio = get(audioStore);
  const trackList = get(tracks);
  const state = get(playerState);
  if (!audio || trackList.length === 0) return;

  playerState.update(s => ({ ...s, duration: audio.duration }));
  // Optionally store duration in track object
  trackList[state.current].duration = audio.duration;
}

export function onEndedGlobal() {
  const state = get(playerState);
  if (state.repeat || state.shuffle || state.current < get(tracks).length - 1) {
    nextTrack();
  } else {
    playerState.update(s => ({ ...s, playing: false }));
  }
}
