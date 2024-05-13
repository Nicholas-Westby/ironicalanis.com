import './style.css'
import {
  Scene, Camera, WebGLRenderer,
  DirectionalLight, AmbientLight,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {addSphere} from './sphere.ts';
import {playVideo} from './video.ts';
import {addOrbitControls} from "./orbit.ts";
import {addCamera} from "./camera.ts";
import {getAspect} from "./window.ts";

const enableOrbit = true,
  autoplay = true;

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer,
  orbit: OrbitControls;

function getGlobals() {
  return {
    enableOrbit,
    autoplay,
    scene,
    camera,
    renderer,
    orbit,
  };
}

async function init() {
  addScene();
  addRenderer();
  camera = addCamera();
  addDirectionalLight();
  addAmbientLight();
  if (enableOrbit) {
    orbit = addOrbitControls(getGlobals());
  }
}

function addScene() {
  scene = new Scene();
}

function addRenderer() {
  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onResize);
}

function addDirectionalLight() {
  const directionalLight = new DirectionalLight(0xffffff);
  directionalLight.position.set(20, 10, 30).normalize();
  directionalLight.intensity = 3;
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

function addAmbientLight() {
  const light = new AmbientLight(0xffffff);
  light.intensity = 0.1;
  scene.add(light);
}

async function animate() {
  requestAnimationFrame(animate);
  orbit?.update();
  renderer.render(scene, camera);
}

function onResize() {
  (camera as any).aspect = getAspect();
  (camera as any).updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

async function initButton() {
  const button = document.querySelector('button') as HTMLButtonElement;
  button.addEventListener('click', playVideo);
}

await init();
await addSphere(getGlobals());
await animate();
await initButton();
