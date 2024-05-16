import {Raycaster, Vector2, Camera, Scene, Intersection} from "three";

const raycaster = new Raycaster();
const pointer = new Vector2(-1, 1);

function onPointerMove( event: any ) {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

export async function checkIntersections({camera, scene}: {camera: Camera, scene: Scene}) {
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster
    .intersectObjects(scene.children, true)
    .toSorted((x: Intersection, y: Intersection) => y.distance - x.distance);

  if (intersects.length > 0) {
    //intersects[0].object.material.color.set( 0xff0000);
    //TODO: Look at parent recursively until we find one that matches an existing irony.
    //TODO: Add click handler.
  }
}

window.addEventListener( 'pointermove', onPointerMove );
