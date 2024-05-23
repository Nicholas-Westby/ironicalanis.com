import {unmuteVideo} from "./video.ts";

/**
 * Enables the video's sound on the first click (since browsers will not play
 * sound on auto-played videos).
 */
export async function unmuteOnClick() {
  document.body.addEventListener('click', unmuteVideo);
}
