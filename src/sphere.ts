import {Mesh, SphereGeometry, Scene} from "three";
import {loadVideoMaterial} from './video.ts';

/**
 * Adds the video-covered sphere to the scene.
 *
 * @param scene The scene to add the sphere to.
 */
export async function addSphere({scene}: {scene: Scene}) {
  const geo = new SphereGeometry(1, 100, 100);
  const material = await loadVideoMaterial();
  const mesh = new Mesh(geo, material);
  scene.add(mesh);
}
