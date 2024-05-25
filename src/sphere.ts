import {Mesh, SphereGeometry, Scene} from "three";
import {loadVideoMaterial} from './video.ts';
import {isSmallDevice} from "./device";

/**
 * Adds the video-covered sphere to the scene.
 *
 * @param scene The scene to add the sphere to.
 */
export async function addSphere({scene}: {scene: Scene}) {
  const segments = isSmallDevice() ? 50 : 100,
    geo = new SphereGeometry(1, segments, segments),
    material = await loadVideoMaterial(),
    mesh = new Mesh(geo, material);
  mesh.receiveShadow = true;
  scene.add(mesh);
}
