import {AmbientLight, DirectionalLight, PointLight, Scene} from "three";

function addDirectionalLight({scene}: {scene: Scene}) {
  const directionalLight = new DirectionalLight(0xffffff);
  directionalLight.position.set(20, 10, 30).normalize();
  directionalLight.intensity = 3;
  scene.add(directionalLight);
}

function addPointLight({scene}: {scene: Scene}) {
  const light = new PointLight(0xffffff);
  light.position.set(0, -1, 2);
  light.intensity = 1;
  scene.add(light);
}

function addAmbientLight({scene}: {scene: Scene}) {
  const light = new AmbientLight(0xffffff);
  light.intensity = 0.1;
  scene.add(light);
}

export function addLights({scene}: {scene: Scene}) {
  addAmbientLight({scene});
  addDirectionalLight({scene});
  addPointLight({scene});
}
