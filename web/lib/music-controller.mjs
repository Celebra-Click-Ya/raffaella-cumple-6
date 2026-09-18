/** @param {()=>void} requestPlay @param {()=>void} requestPause @param {(value:string)=>void} notify */
export function createMusicController(requestPlay, requestPause = () => {}, notify = (_value) => {}) {
  let status = 'loading', ready = false, manuallyPaused = false, pauseConfirmed = false;
  const set = value => { status = value; notify(value); };
  const attempt = () => { if (!ready) return; manuallyPaused = false; pauseConfirmed = false; set('pending'); try { requestPlay(); } catch { set('error'); } };
  return {
    get status() { return status; },
    ready() { ready = true; if (!manuallyPaused) attempt(); },
    cover() { if (!manuallyPaused && status !== 'playing') attempt(); },
    play: attempt,
    pause() { manuallyPaused = true; pauseConfirmed = false; requestPause(); set('paused'); },
    playing() { if (manuallyPaused && !pauseConfirmed) { requestPause(); set('paused'); } else { manuallyPaused = false; pauseConfirmed = false; set('playing'); } },
    paused() { if (status === 'playing' || manuallyPaused) { manuallyPaused = true; pauseConfirmed = true; set('paused'); } },
    ended() { manuallyPaused = true; pauseConfirmed = true; set('paused'); },
    blocked() { if (status === 'pending') set('blocked'); },
    error() { set('error'); },
  };
}
