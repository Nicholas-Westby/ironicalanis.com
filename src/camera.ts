import {PerspectiveCamera, Vector3} from "three";
import {getAspect} from './window.ts';

/**
 * Creates the camera that will be used to view the scene.
 */
export function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(45, getAspect(), 0.1, 1000);
  camera.position.z = 1.5;
  camera.position.y = 0;
  camera.position.x = 0;
  camera.lookAt(getTarget());
  return camera;
}

/**
 * Returns the target position to point the camera toward (near the top
 * of the sphere).
 */
export function getTarget() {
  return new Vector3(0, 0.8, 0);
}
