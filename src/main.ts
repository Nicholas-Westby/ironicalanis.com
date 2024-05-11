import './style.css'
import {
  Scene, Camera, WebGLRenderer, PerspectiveCamera, Mesh,
  DirectionalLight, AmbientLight, SphereGeometry,
  VideoTexture, MeshBasicMaterial,
  Vector2,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const enableOrbit = false;

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer,
  orbit: OrbitControls;

async function init() {
  addScene();
  addRenderer();
  addCamera();
  addDirectionalLight();
  addAmbientLight();
  enableOrbit && addOrbitControls();
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

function getAspect() {
  return window.innerWidth / window.innerHeight;
}

function addCamera() {
  camera = new PerspectiveCamera(45, getAspect(), 0.1, 1000);
  camera.position.z = 1.5;
  camera.position.y = 0;
  camera.lookAt(0, 0.8, 0);
}

function addOrbitControls() {
  orbit = new OrbitControls(camera, renderer.domElement);
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

async function addSphere() {
  const geo = new SphereGeometry(1, 50, 50);
  const material = await loadVideoMaterial();
  const mesh = new Mesh(geo, material);
  scene.add(mesh);
}

function getVideo(): HTMLVideoElement {
  return document.querySelector('video') || document.createElement('video');
}

async function loadVideoMaterial() {
  const video = getVideo();
  const videoTexture = new VideoTexture(video);
  videoTexture.repeat.set(4, 3);
  videoTexture.offset = new Vector2(-.55, -1.4);
  return new MeshBasicMaterial({ map: videoTexture });
}

async function initButton() {
  const button = document.querySelector('button') as HTMLButtonElement;
  button.addEventListener('click', () => {
    getVideo().play();
    document.body.classList.add('playing');
  });
}

await init();
await addSphere();
await animate();
await initButton();
