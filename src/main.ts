import './styles/style.css';
import {
  Scene, Camera, WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {addSphere} from './sphere';
import {addOrbitControls} from "./orbit";
import {addCamera} from "./camera";
import {addLights} from "./light";
import {addRenderer, addScene, animate} from "./render";
import {initButton} from "./button";
import {addIronies} from "./models";
import {initIntersections} from "./mouse.ts";
import {addStars} from "./stars.ts";

const enableOrbit = false;

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer,
  orbit: OrbitControls;

function getGlobals() {
  return {
    enableOrbit,
    scene,
    camera,
    renderer,
    orbit,
  };
}

async function init() {
  scene = addScene();
  camera = addCamera();
  renderer = addRenderer(getGlobals());
  addLights(getGlobals());
  if (enableOrbit) {
    orbit = addOrbitControls(getGlobals());
  }
}

await init();
await addStars(getGlobals());
await addSphere(getGlobals());
await addIronies(getGlobals());
await animate(getGlobals());
await initButton();
await initIntersections(getGlobals());
