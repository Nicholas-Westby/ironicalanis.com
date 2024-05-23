import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {Camera, WebGLRenderer} from "three";
import {getTarget} from "./camera.ts";

let orbit: OrbitControls;

/**
 * Adds the orbit controls that allow navigating the scene.
 */
export function addOrbitControls({camera, renderer}: {camera: Camera, renderer: WebGLRenderer}) {
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.target = getTarget();
}

/**
 * Updates the orbit controls (to be called on each render).
 */
export function updateOrbitControls() {
  orbit?.update();
}
