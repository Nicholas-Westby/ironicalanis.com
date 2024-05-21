import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {Camera, WebGLRenderer} from "three";
import {getTarget} from "./camera.ts";

let orbit: OrbitControls;

export function addOrbitControls({camera, renderer}: {camera: Camera, renderer: WebGLRenderer}) {
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.target = getTarget();
}

export function updateOrbitControls() {
  orbit?.update();
}
