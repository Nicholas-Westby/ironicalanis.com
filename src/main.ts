import './style.css'
import { Scene, Camera, WebGLRenderer, PerspectiveCamera, Mesh, DirectionalLight, AmbientLight, BoxGeometry, MeshStandardMaterial } from 'three';

let scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer;

async function init() {
  addScene();
  addRenderer();
  addCamera();
  addDirectionalLight();
  addAmbientLight();
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
  camera = new PerspectiveCamera(45, getAspect(), 1, 1000);
  camera.position.z = 4;
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
  renderer.render(scene, camera);
}

function onResize() {
  (camera as any).aspect = getAspect();
  (camera as any).updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

async function addCube() {
  const cubeGeo = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({color: 0x008888});
  const cube = new Mesh(cubeGeo, material);
  scene.add(cube);
}

await init();
await addCube();
await animate();
