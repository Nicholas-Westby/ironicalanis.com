import './style.css'
import {
  Scene, Camera, WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {addSphere} from './sphere.ts';
import {addOrbitControls} from "./orbit.ts";
import {addCamera} from "./camera.ts";
import {addAmbientLight, addDirectionalLight} from "./light.ts";
import {addRenderer, addScene, animate} from "./render.ts";
import {initButton} from "./button.ts";

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
  addDirectionalLight(getGlobals());
  addAmbientLight(getGlobals());
  if (enableOrbit) {
    orbit = addOrbitControls(getGlobals());
  }
}

await init();
await addSphere(getGlobals());
await animate(getGlobals());
await initButton();
