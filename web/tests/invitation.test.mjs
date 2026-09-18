import test from 'node:test';
import assert from 'node:assert/strict';
import { createMusicController } from '../lib/music-controller.mjs';
import { countdown } from '../lib/countdown.mjs';

test('ready attempts audible playback without falsely reporting playing', () => {
  let requests = 0;
  const c = createMusicController(() => requests++);
  c.ready();
  assert.equal(requests, 1);
  assert.equal(c.status, 'pending');
  c.playing();
  assert.equal(c.status, 'playing');
});
test('blocked autoplay retries during real cover interaction', () => {
  let requests = 0;
  const c = createMusicController(() => requests++);
  c.ready(); c.blocked(); c.cover();
  assert.equal(requests, 2);
  assert.equal(c.status, 'pending');
});
test('cover interaction retries even while autoplay has not settled', () => {
  let requests=0;
  const c=createMusicController(()=>requests++);
  c.ready();c.cover();
  assert.equal(requests,2);
});
test('pausing inside embedded player also prevents cover restart', () => {
  const c=createMusicController(()=>{});
  c.ready();c.playing();c.paused();c.cover();
  assert.equal(c.status,'paused');
});
test('native play can resume after a confirmed manual pause', () => {
  const c=createMusicController(()=>{});
  c.ready();c.playing();c.pause();c.paused();c.playing();
  assert.equal(c.status,'playing');
});
test('manual pause is respected by cover and late playback events', () => {
  let requests = 0, pauses = 0;
  const c = createMusicController(() => requests++, () => pauses++);
  c.ready(); c.playing(); c.pause(); c.cover(); c.playing();
  assert.equal(requests, 1);
  assert.equal(c.status, 'paused');
  assert.equal(pauses, 2);
  c.play(); c.playing();
  assert.equal(c.status, 'playing');
});
test('early interaction never pretends the player is ready', () => {
  let requests = 0;
  const c = createMusicController(() => requests++);
  c.cover();
  assert.equal(requests, 0);
  assert.equal(c.status, 'loading');
  c.ready(); c.blocked();
  assert.equal(c.status, 'blocked');
});
test('player error is visible and manual retry remains available', () => {
  const c = createMusicController(() => {});
  c.ready(); c.error();
  assert.equal(c.status, 'error');
  c.play();
  assert.equal(c.status, 'pending');
});
test('countdown uses 3 pm Lima and clamps after event', () => {
  assert.deepEqual(countdown(Date.parse('2026-09-25T19:58:57Z')), [1,0,1,3]);
  assert.deepEqual(countdown(Date.parse('2026-09-26T20:00:00Z')), [0,0,0,0]);
  assert.deepEqual(countdown(Date.parse('2026-09-27T20:00:00Z')), [0,0,0,0]);
});
