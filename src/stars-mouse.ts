import {Raycaster, Vector2, Camera, Mesh} from "three";
import {getMesh} from "./stars.ts";

const raycaster = new Raycaster(),
  pointer = new Vector2(-1, 1);

async function updateMaterial({camera}: {camera: Camera}) {
  const mesh = getMesh();

  if (!mesh) {
    return;
  }

  raycaster.setFromCamera(pointer, camera);

  const intersect = raycaster
    .intersectObject(mesh, true)[0];

  if (!intersect || !intersect.uv) {
    return;
  }

  updateMouseUv(mesh, intersect.uv);
}

function updateMouseUv(mesh: Mesh, mouseUv: Vector2) {
  const shader = (mesh.material as any).userData.shader;
  if (shader) {
    shader.uniforms.mouseUv.value = mouseUv;
  }
}

function setMousePos({x, y}: {x: number, y: number}) {
  pointer.x = ( x / window.innerWidth ) * 2 - 1;
  pointer.y = - ( y / window.innerHeight ) * 2 + 1;
}

async function onPointerMove(event: any, camera: Camera) {
  setMousePos({ x: event.clientX, y: event.clientY });
  await updateMaterial({camera});
}

export async function initStarsMouse({camera}: {camera: Camera}) {
  window.addEventListener( 'pointermove', async (event: any) => {
    await onPointerMove(event, camera);
  });
}
