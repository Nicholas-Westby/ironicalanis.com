import {addOrbitControls as internalAddOrbitControls, updateOrbitControls as internalUpdateOrbitControls} from './orbit-fake';
//import {addOrbitControls as internalAddOrbitControls, updateOrbitControls as internalUpdateOrbitControls} from './orbit-real';
import {Camera, WebGLRenderer} from "three";

export function addOrbitControls({camera, renderer}: {camera: Camera, renderer: WebGLRenderer}) {
  internalAddOrbitControls({camera, renderer});
}

export function updateOrbitControls() {
  internalUpdateOrbitControls();
}
