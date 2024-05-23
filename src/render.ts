import {Camera, Scene, WebGLRenderer} from "three";
import {getAspect} from "./window";
import {animateIronies} from "./irony-animation";
import {updateTime} from "./stars.ts";
import {updateOrbitControls} from "./orbit.ts";

/**
 * Adds the Three.js WebGL renderer to the page.
 *
 * @param camera The camera that views the scene to render.
 */
export function addRenderer({camera}: {camera: Camera}) {
  const renderer = new WebGLRenderer({
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

/**
 * Initiates the scene render and triggers it again for each subsequent frame.
 *
 * @param renderer The WebGL renderer (draws the scene to a canvas).
 * @param scene The scene to render.
 * @param camera The camera that views the scene to render.
 */
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

/**
 * When the window resizes, adjust the renderer with the updated size and aspect ratio.
 *
 * @param renderer The WebGL renderer.
 * @param camera The camera used to view the scene.
 */
function onResize({renderer, camera}:
                    {renderer: WebGLRenderer, camera: Camera}) {
  (camera as any).aspect = getAspect();
  (camera as any).updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Creates the primary scene that is rendered.
 */
export function createScene(): Scene {
  return new Scene();
}
