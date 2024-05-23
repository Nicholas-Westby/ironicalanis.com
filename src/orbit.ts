// Use the real orbit controls when troubleshooting locally. Otherwise, use the fake ones to avoid
// the extra payload once deployed.
import {addOrbitControls as internalAddOrbitControls, updateOrbitControls as internalUpdateOrbitControls} from './orbit-fake';
//import {addOrbitControls as internalAddOrbitControls, updateOrbitControls as internalUpdateOrbitControls} from './orbit-real';
import {Camera, WebGLRenderer} from "three";

/**
 * Adds the orbit controls that allow navigating the scene.
 */
export function addOrbitControls({camera, renderer}: {camera: Camera, renderer: WebGLRenderer}) {
  internalAddOrbitControls({camera, renderer});
}

/**
 * Updates the orbit controls (to be called on each render).
 */
export function updateOrbitControls() {
  internalUpdateOrbitControls();
}
