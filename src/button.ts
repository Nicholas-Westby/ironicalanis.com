import {unmuteVideo} from "./video.ts";

export async function initButton() {
  const button = document.querySelector('button') as HTMLButtonElement;
  button.addEventListener('click', unmuteVideo);
}
