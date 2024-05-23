import './styles/style.css';
import {
  Scene, Camera, WebGLRenderer,
} from 'three';
import {addSphere} from './sphere';
import {addOrbitControls} from "./orbit";
import {createCamera} from "./camera";
import {addLights} from "./light";
import {addRenderer, addScene, animate} from "./render";
import {addIronies} from "./models";
import {initIntersections} from "./mouse.ts";
import {addStars} from "./stars.ts";
import {initStarsMouse} from "./stars-mouse.ts";
import {unmuteOnClick} from "./unmute-on-click.ts";

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer;

/**
 * Retrieves the global variables (convenience function).
 */
const getGlobals = () => ({
  scene,
  camera,
  renderer,
});

/**
 * Initialize the app.
 */
async function init() {
  scene = addScene();
  camera = createCamera();
  renderer = addRenderer(getGlobals());
  const globals = getGlobals();
  addLights(globals);
  addOrbitControls(globals);
  await addStars(globals);
  await addSphere(globals);
  await addIronies(globals);
  await animate(globals);
  await unmuteOnClick();
  await initIntersections(globals);
  await initStarsMouse(globals);
}

await init();
