import {AmbientLight, DirectionalLight, PointLight, Scene} from "three";

/**
 * Adds the main directional light to the scene.
 * @param scene The scene to add the light to.
 */
function addDirectionalLight({scene}: {scene: Scene}) {
  const directionalLight = new DirectionalLight(0xffffff);
  directionalLight.position.set(20, 10, 30).normalize();
  directionalLight.intensity = 3;
  scene.add(directionalLight);
}

/**
 * Adds a point light to the scene to avoid overly dark surfaces as they pass near the camera.
 * @param scene The scene to add the light to.
 */
function addPointLight({scene}: {scene: Scene}) {
  const light = new PointLight(0xffffff);
  light.position.set(0, -1, 2);
  light.intensity = 1;
  scene.add(light);
}

/**
 * Adds an ambient light to the scene to avoid harsh dark surfaces.
 * @param scene The scene to add the light to.
 */
function addAmbientLight({scene}: {scene: Scene}) {
  const light = new AmbientLight(0xffffff);
  light.intensity = 0.1;
  scene.add(light);
}

/**
 * Adds all 3 lights to the scene.
 * @param scene The scene to add the light to.
 */
export function addLights({scene}: {scene: Scene}) {
  addAmbientLight({scene});
  addDirectionalLight({scene});
  addPointLight({scene});
}
