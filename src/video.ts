import {MeshStandardMaterial, Vector2, VideoTexture} from "three";

/**
 * Loads the video into a material.
 */
export async function loadVideoMaterial() {
  const video = getVideo();
  video.muted = true;
  await playVideo();
  const videoTexture = new VideoTexture(video);
  videoTexture.repeat.set(3.8, 3);
  videoTexture.offset = new Vector2(-.45, -1.4);
  return new MeshStandardMaterial({ map: videoTexture });
}

/**
 * Plays the video.
 */
export async function playVideo() {
  await getVideo().play();
}

/**
 * Returns the video element.
 */
function getVideo(): HTMLVideoElement {
  return document.querySelector('video') || document.createElement('video');
}

/**
 * Unmutes the video's audio (it is muted by default due to browser restrictions).
 */
export async function unmuteVideo() {
  const video = getVideo();
  video.muted = false;
}
