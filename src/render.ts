import {Camera, Scene, WebGLRenderer} from "three";
import {getAspect} from "./window";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {animateIronies} from "./irony-animation";

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

export async function animate({orbit, renderer, scene, camera}:
                         {orbit: OrbitControls, renderer: WebGLRenderer, scene: Scene, camera: Camera}) {
  requestAnimationFrame(() => {
    animate({orbit, renderer, scene, camera});
  });
  await animateIronies();
  orbit?.update();
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
