import {Object3D} from "three";

/**
 * Ensures all materials in the specified model support transparency.
 */
export async function transparentMaterial({model}: {model: Object3D}): Promise<Object3D> {
  model.traverse((x: Object3D) => {
    if (!(x as any).isMesh) {
      return;
    }
    const material = (x as any).material;
    material.transparent = true;
    if (material.name === 'Glass') {
      material.depthWrite = false;
    }
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
    const material = (x as any).material;
    if (material.name !== 'Glass') {
      x.castShadow = true;
    }
  });
  return model;
}
