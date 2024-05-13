import {MeshBasicMaterial, Vector2, VideoTexture} from "three";

export async function loadVideoMaterial({autoplay}: {autoplay: boolean}) {
  const video = getVideo();
  if (autoplay) {
    video.muted = true;
    await playVideo();
  }
  const videoTexture = new VideoTexture(video);
  videoTexture.repeat.set(3.8, 3);
  videoTexture.offset = new Vector2(-.45, -1.4);
  return new MeshBasicMaterial({ map: videoTexture });
}

export async function playVideo() {
  await getVideo().play();
  document.body.classList.add('playing');
}

function getVideo(): HTMLVideoElement {
  return document.querySelector('video') || document.createElement('video');
}
