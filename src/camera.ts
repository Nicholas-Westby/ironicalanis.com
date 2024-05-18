import {PerspectiveCamera, Vector3} from "three";
import {getAspect} from './window.ts';

export function addCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(45, getAspect(), 0.1, 1000);
  camera.position.z = 1.5;
  camera.position.y = 0;
  camera.position.x = 0;
  camera.lookAt(getTarget());
  return camera;
}

export function getTarget() {
  return new Vector3(0, 0.8, 0);
}
