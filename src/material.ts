import {Object3D} from "three";

/**
 * Ensures all materials in the specified model support transparency.
 */
export async function transparentMaterial({model}: {model: Object3D}): Promise<Object3D> {
  model.traverse((x: Object3D) => {
    if (!(x as any).isMesh) {
      return;
    }
    (x as any).material.transparent = true;
  });
  return model;
}

/**
 * Ensures all materials in the specified model cast a shadow.
 */
export async function shadowCastMaterial({model}: {model: Object3D}): Promise<Object3D> {
  model.traverse((x: Object3D) => {
    if (!(x as any).isMesh) {
      return;
    }
    x.castShadow = true;
  });
  return model;
}
