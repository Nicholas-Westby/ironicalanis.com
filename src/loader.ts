import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Group, Object3DEventMap, Scene} from "three";
import {transparentMaterial} from "./material.ts";

export async function addObject({scene, name, scale}: {scene: Scene, name: string, scale?: number}): Promise<Group<Object3DEventMap>> {
  const loader = new GLTFLoader().setPath(`/assets/models/${name}/`);
  return new Promise((resolve) => {
    loader.load(`${name}.gltf`, async (gltf) => {
      const model = gltf.scene;
      await transparentMaterial({model});

      const factor = scale || 0.1;
      model.scale.set(factor, factor, factor);
      model.position.y += 1;

      // Add a group so we can easily pivot around the origin.
      const group = new Group();
      group.position.set(0, 0, 0);
      group.rotation.set(0, 0, 0);
      group.add(model);
      scene.add(group);

      scene.add(group);

      resolve(group);
    });
  });
}
