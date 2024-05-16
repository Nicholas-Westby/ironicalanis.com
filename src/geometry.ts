import {Object3D} from "three";
import {toCreasedNormals} from "three/examples/jsm/utils/BufferGeometryUtils.js";

export async function smoothGeometry({model}: {model: Object3D}): Promise<Object3D> {
  model.traverse((x: Object3D) => {
    if (!(x as any).isMesh) {
      return;
    }
    (x as any).geometry = toCreasedNormals((x as any).geometry, (50 / 180.0) * Math.PI);
  });
  return model;
}
