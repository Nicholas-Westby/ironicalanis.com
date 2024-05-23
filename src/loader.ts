import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Group, Object3DEventMap, Scene} from "three";
import {transparentMaterial} from "./material.ts";

/**
 * Adds an irony 3D model to the scene.
 * @param scene The scene to add the model to.
 * @param name The name of the model (will be loaded from the file system by convention).
 * @param scale The scale to resize the model to (will default if unspecified).
 */
export async function addIronyObject({scene, name, scale}: {scene: Scene, name: string, scale?: number}): Promise<Group<Object3DEventMap>> {
  const loader = new GLTFLoader().setPath(`/assets/models/${name}/`);
  return new Promise((resolve) => {
    loader.load(`${name}.gltf`, async (gltf) => {
      const model = gltf.scene;
      await transparentMaterial({model});

      const factor = scale || 0.1;
      model.scale.set(factor, factor, factor);
      model.position.y += 1;

      // Add a group (so we can easily pivot around the origin, and thus around the sphere).
      const group = new Group();
      group.position.set(0, 0, 0);
      group.rotation.set(0, 0, 0);
      group.add(model);

      scene.add(group);

      resolve(group);
    });
  });
}
