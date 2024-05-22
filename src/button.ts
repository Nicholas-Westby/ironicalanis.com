import {unmuteVideo} from "./video.ts";

export async function initButton() {
  document.body.addEventListener('click', unmuteVideo);
}
