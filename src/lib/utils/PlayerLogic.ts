export interface Track {
    title: string;
    artist: string;
    src: string;
    cover: string;
    duration?: number | null;
  }
  
  export interface PlayerState {
    current: number;
    playing: boolean;
    progress: number;
    duration: number;
    volume: number;
    repeat: boolean;
    shuffle: boolean;
  }
  
  /** Initialize state */
  export function createPlayerState(): PlayerState {
    return {
      current: 0,
      playing: false,
      progress: 0,
      duration: 0,
      volume: 1,
      repeat: false,
      shuffle: false,
    };
  }
  
  /** Play a specific track */
  export function playTrack(state: PlayerState, audio: HTMLAudioElement, idx: number, tracks: Track[]) {
    state.current = idx;
    audio.src = tracks[idx].src;
    audio.play();
    state.playing = true;
  }
  
  /** Toggle play/pause */
  export function togglePlay(state: PlayerState, audio: HTMLAudioElement) {
    if (state.playing) {
      audio.pause();
      state.playing = false;
    } else {
      audio.play();
      state.playing = true;
    }
  }
  
  /** Next track logic */
  export function nextTrack(state: PlayerState, audio: HTMLAudioElement, tracks: Track[]) {
    if (state.shuffle) {
      let next;
      do {
        next = Math.floor(Math.random() * tracks.length);
      } while (next === state.current && tracks.length > 1);
      playTrack(state, audio, next, tracks);
    } else if (state.current < tracks.length - 1) {
      playTrack(state, audio, state.current + 1, tracks);
    } else if (state.repeat) {
      playTrack(state, audio, 0, tracks);
    }
  }
  
  /** Previous track logic */
  export function prevTrack(state: PlayerState, audio: HTMLAudioElement, tracks: Track[]) {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else if (state.current > 0) {
      playTrack(state, audio, state.current - 1, tracks);
    } else if (state.repeat) {
      playTrack(state, audio, tracks.length - 1, tracks);
    }
  }
  
  /** Seek to a position */
  export function seek(state: PlayerState, audio: HTMLAudioElement, value: number) {
    audio.currentTime = value;
    state.progress = value;
  }
  
  /** Set volume */
  export function setVolume(state: PlayerState, audio: HTMLAudioElement, value: number) {
    state.volume = value;
    audio.volume = value;
  }
  
  /** Toggle repeat/shuffle */
  export function toggleRepeat(state: PlayerState) { state.repeat = !state.repeat; }
  export function toggleShuffle(state: PlayerState) { state.shuffle = !state.shuffle; }
  
  /** Handle time update */
  export function onTimeUpdate(state: PlayerState, audio: HTMLAudioElement) {
    state.progress = audio.currentTime;
    state.duration = audio.duration;
    return state.progress;
  }
  
  /** Handle metadata loaded */
  export function onLoadedMetadata(state: PlayerState, audio: HTMLAudioElement, tracks: Track[]) {
    state.duration = audio.duration;
    tracks[state.current].duration = audio.duration;
  }
  
  /** Handle track ended */
  export function onEnded(state: PlayerState, audio: HTMLAudioElement, tracks: Track[]) {
    if (state.repeat || state.shuffle || state.current < tracks.length - 1) {
      nextTrack(state, audio, tracks);
    } else {
      state.playing = false;
    }
  }
  