import test from 'node:test';
import assert from 'node:assert/strict';
import { bindAudio } from '../lib/audio-player.mjs';

class Media extends EventTarget {
  volume=1;
  paused=true;
  nextPlay=()=>Promise.resolve();
  play(){return this.nextPlay();}
  pause(){this.paused=true;this.dispatchEvent(new Event('pause'));}
  start(){this.paused=false;this.dispatchEvent(new Event('playing'));}
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('autoplay rejection displays blocked and real interaction can retry', async()=>{
  const audio=new Media();
  audio.nextPlay=()=>Promise.reject({name:'NotAllowedError'});
  const {controller,dispose}=bindAudio(audio);
  await tick();
  assert.equal(controller.status,'blocked');
  audio.nextPlay=()=>Promise.resolve();controller.cover();audio.start();
  assert.equal(controller.status,'playing');
  dispose();
});
test('cancelled pending autoplay cannot report a late failure', async()=>{
  const audio=new Media();let reject;
  audio.nextPlay=()=>new Promise((_,r)=>{reject=r;});
  const {controller,dispose}=bindAudio(audio);
  controller.pause();reject({name:'NotAllowedError'});await tick();
  assert.equal(controller.status,'paused');
  controller.cover();assert.equal(controller.status,'paused');
  dispose();
});
test('failure from an old play request cannot block a newer successful request', async()=>{
  const audio=new Media();let reject;
  audio.nextPlay=()=>new Promise((_,r)=>{reject=r;});
  const {controller,dispose}=bindAudio(audio);
  audio.nextPlay=()=>Promise.resolve();controller.cover();audio.start();
  reject({name:'NotAllowedError'});await tick();
  assert.equal(controller.status,'playing');dispose();
});
test('invalid media is an error rather than an autoplay permission hint', async()=>{
  const audio=new Media();audio.nextPlay=()=>Promise.reject({name:'NotSupportedError'});
  const {controller,dispose}=bindAudio(audio);await tick();
  assert.equal(controller.status,'error');dispose();
});
test('disposing removes media listeners and pauses the resource',()=>{
  const audio=new Media();const {controller,dispose}=bindAudio(audio);
  audio.start();dispose();
  assert.equal(audio.paused,true);
  audio.dispatchEvent(new Event('error'));
  assert.equal(controller.status,'playing');
});
