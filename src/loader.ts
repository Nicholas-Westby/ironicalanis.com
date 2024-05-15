import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Scene} from "three";

export async function addObject({scene, name, scale}: {scene: Scene, name: string, scale?: number}) {
  const loader = new GLTFLoader().setPath(`/assets/models/${name}/`);
  loader.load(`${name}.gltf`, async (gltf) => {
    const model = gltf.scene;

    const factor = scale || 0.1;
    model.scale.set(factor, factor, factor);
    model.position.y += 1;

    scene.add(model);
  });
}
