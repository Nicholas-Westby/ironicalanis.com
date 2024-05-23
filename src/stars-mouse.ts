import {Raycaster, Vector2, Camera, Mesh} from "three";
import {getMesh} from "./stars.ts";

const raycaster = new Raycaster(),
  pointer = new Vector2(-1, 1);

/**
 * Updates the star field material with the mouse position.
 *
 * @param camera The camera used to view the scene.
 */
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

/**
 * Sends the mouse position (relative to the star field surface) to the shader.
 *
 * @param mesh The star field mesh.
 * @param mouseUv The mouse position on the mesh surface.
 */
function updateMouseUv(mesh: Mesh, mouseUv: Vector2) {
  const shader = (mesh.material as any).userData.shader;
  if (shader) {
    shader.uniforms.mouseUv.value = mouseUv;
  }
}

/**
 * Stores the specified mouse position.
 *
 * @param x The mouse x coordinate.
 * @param y The mouse y coordinate.
 */
function setMousePos({x, y}: {x: number, y: number}) {
  pointer.x = ( x / window.innerWidth ) * 2 - 1;
  pointer.y = - ( y / window.innerHeight ) * 2 + 1;
}

/**
 * When the mouse moves, update the coordinate and update the star field.
 *
 * @param event The mouse move event.
 * @param camera The camera that is viewing the scene.
 */
async function onPointerMove(event: any, camera: Camera) {
  setMousePos({ x: event.clientX, y: event.clientY });
  await updateMaterial({camera});
}

/**
 * Adds the event listener when the mouse moves so the star field can be updated based on the mouse position.
 *
 * @param camera The camera that is used to view the scene.
 */
export async function initStarsMouse({camera}: {camera: Camera}) {
  window.addEventListener( 'pointermove', async (event: any) => {
    await onPointerMove(event, camera);
  });
}
