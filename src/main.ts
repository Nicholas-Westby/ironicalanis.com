import './styles/style.css';
import {
  Scene, Camera, WebGLRenderer,
} from 'three';
import {addSphere} from './sphere';
import {addOrbitControls} from "./orbit";
import {addCamera} from "./camera";
import {addLights} from "./light";
import {addRenderer, addScene, animate} from "./render";
import {initButton} from "./button";
import {addIronies} from "./models";
import {initIntersections} from "./mouse.ts";
import {addStars} from "./stars.ts";
import {initStarsMouse} from "./stars-mouse.ts";

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer;

function getGlobals() {
  return {
    scene,
    camera,
    renderer,
  };
}

async function init() {
  scene = addScene();
  camera = addCamera();
  renderer = addRenderer(getGlobals());
  const globals = getGlobals();
  addLights(globals);
  addOrbitControls(globals);
  await addStars(globals);
  await addSphere(globals);
  await addIronies(globals);
  await animate(globals);
  await initButton();
  await initIntersections(globals);
  await initStarsMouse(globals);
}

await init();
