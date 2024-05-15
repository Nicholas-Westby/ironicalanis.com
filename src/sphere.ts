import {Mesh, SphereGeometry, Scene} from "three";
import {loadVideoMaterial} from './video.ts';

export async function addSphere({scene}: {scene: Scene}) {
  const geo = new SphereGeometry(1, 50, 50);
  const material = await loadVideoMaterial();
  const mesh = new Mesh(geo, material);
  scene.add(mesh);
}

