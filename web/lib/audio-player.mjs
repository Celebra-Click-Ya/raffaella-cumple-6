import { createMusicController } from './music-controller.mjs';

/** @param {HTMLAudioElement} audio @param {(status:string)=>void} notify */
export function bindAudio(audio, notify = (_status) => {}) {
  let active = true, request = 0;
  const controller = createMusicController(() => {
    const current = ++request;
    audio.play().catch(error => {
      if (!active || current !== request || controller.status !== 'pending') return;
      if (error.name === 'NotAllowedError') controller.blocked();
      else controller.error();
    });
  }, () => { request++; audio.pause(); }, notify);
  const playing = () => controller.playing();
  const paused = () => controller.paused();
  const ended = () => controller.ended();
  const error = () => controller.error();
  audio.volume = 0.65;
  audio.addEventListener('playing', playing);
  audio.addEventListener('pause', paused);
  audio.addEventListener('ended', ended);
  audio.addEventListener('error', error);
  controller.ready();
  return { controller, dispose() {
    active = false; request++;
    audio.removeEventListener('playing', playing);
    audio.removeEventListener('pause', paused);
    audio.removeEventListener('ended', ended);
    audio.removeEventListener('error', error);
    audio.pause();
  } };
}
