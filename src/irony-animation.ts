import {getInsertedIronies} from "./models";

const videoEl = document.querySelector('video');

let lastVideoTime: number,
  lastPerfTime: number;

/**
 * Retrieves the number of seconds elapsed since the start of the video. Combines playhead time
 * with elapsed time to ensure a smooth animation experience. This nuanced approach might not be
 * useful most of the time, but playhead time may be imprecise due to things like timing attacks.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
 */
function getSeconds() {
  const seconds = videoEl!.currentTime,
    now = performance.now();
  if (seconds !== lastVideoTime) {
    lastVideoTime = seconds;
    lastPerfTime = now;
  }
  const diff = now - lastPerfTime;
  return seconds + diff / 1000.0;
}

/**
 * Animates the ironies by updating their rotation based on the current time.
 */
export async function animateIronies() {
  const ironies = await getInsertedIronies(),
    seconds = getSeconds(),
    start = -2,
    end = 10;
  for (const irony of ironies) {
    const relevantTime = irony.times.find(time =>
      seconds >= time + start && seconds <= time + end);
    if (relevantTime) {

      // Rotate the irony into view.
      const progress = (seconds - relevantTime) / (end - start);
      const factor = 2.2;
      irony.model.rotation.x = progress * factor;

    } else {

      // Keep the irony out of view (behind the sphere).
      irony.model.rotation.x = -2;

    }
  }
}
