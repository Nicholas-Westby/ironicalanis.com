import './styles/style.css';
import {
  Scene, Camera, WebGLRenderer,
} from 'three';
import {addSphere} from './sphere';
import {addCamera} from "./camera";
import {addLights} from "./light";
import {addRenderer, addScene, animate} from "./render";
import {initButton} from "./button";
import {addIronies} from "./models";
import {initIntersections} from "./mouse.ts";

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
  addLights(getGlobals());
}

await init();
await addSphere(getGlobals());
await addIronies(getGlobals());
await animate(getGlobals());
await initButton();
await initIntersections(getGlobals());
