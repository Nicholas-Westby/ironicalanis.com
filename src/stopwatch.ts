const el = document.getElementById('stopwatch'),
  videoEl = document.querySelector('video');

el!.parentElement!.style.display = '';

setInterval(() => {
  const seconds = Math.trunc(videoEl!.currentTime);
  el!.innerText = `${seconds}s`;
}, 100);
