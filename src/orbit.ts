import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Camera, WebGLRenderer} from "three";
import {getTarget} from "./camera.ts";

export function addOrbitControls({camera, renderer}: {camera: Camera, renderer: WebGLRenderer}): OrbitControls {
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.target = getTarget();
  return orbit;
}
