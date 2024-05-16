import {Object3D} from "three";

export async function transparentMaterial({model}: {model: Object3D}): Promise<Object3D> {
  model.traverse((x: Object3D) => {
    if (!(x as any).isMesh) {
      return;
    }
    (x as any).material.transparent = true;
  });
  return model;
}
