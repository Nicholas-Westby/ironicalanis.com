import {Camera, Scene, WebGLRenderer} from "three";
import {getAspect} from "./window";
import {animateIronies} from "./irony-animation";
import {updateTime} from "./stars.ts";
import {updateOrbitControls} from "./orbit.ts";

export function addRenderer({camera}: {camera: Camera}) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', () => {
    onResize({camera, renderer});
  });
  return renderer;
}

export async function animate({renderer, scene, camera}:
                         {renderer: WebGLRenderer, scene: Scene, camera: Camera}) {
  requestAnimationFrame(() => {
    animate({renderer, scene, camera});
  });
  await animateIronies();
  updateTime();
  updateOrbitControls();
  renderer.render(scene, camera);
}

function onResize({renderer, camera}:
                    {renderer: WebGLRenderer, camera: Camera}) {
  (camera as any).aspect = getAspect();
  (camera as any).updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function addScene(): Scene {
  return new Scene();
}
