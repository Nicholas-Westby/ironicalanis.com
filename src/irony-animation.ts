import {getInsertedIronies} from "./models";

const videoEl = document.querySelector('video');

export async function animateIronies() {
  const ironies = await getInsertedIronies(),
    seconds = videoEl!.currentTime,
    start = -2,
    end = 10;
  for (const irony of ironies) {
    const relevantTime = irony.times.find(time =>
      seconds >= time + start && seconds <= time + end);
    if (relevantTime) {
      const progress = (seconds - relevantTime) / (end - start);
      const factor = 2.2;
      irony.model.rotation.x = progress * factor;
    } else {
      irony.model.rotation.x = -2;
    }
  }
}
