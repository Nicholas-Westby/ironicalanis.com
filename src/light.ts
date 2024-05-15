import {AmbientLight, DirectionalLight, Scene} from "three";

export function addDirectionalLight({scene}: {scene: Scene}) {
  const directionalLight = new DirectionalLight(0xffffff);
  directionalLight.position.set(20, 10, 30).normalize();
  directionalLight.intensity = 3;
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

export function addAmbientLight({scene}: {scene: Scene}) {
  const light = new AmbientLight(0xffffff);
  light.intensity = 0.2;
  scene.add(light);
}
