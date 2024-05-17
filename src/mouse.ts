import {Raycaster, Vector2, Camera, Scene, Intersection, WebGLRenderer, Object3D} from "three";
import {getInsertedIronies} from "./models";

const raycaster = new Raycaster(),
  pointer = new Vector2(-1, 1);

async function onMouseClick({camera, scene}: {camera: Camera, scene: Scene}) {
  raycaster.setFromCamera(pointer, camera);

  const intersect = raycaster
    .intersectObjects(scene.children, true)
    .toSorted((x: Intersection, y: Intersection) => x.distance - y.distance)[0];

  if (!intersect) {
    return;
  }

  const ironies = await getInsertedIronies();

  for (const irony of ironies) {
    const matches = ancestorMatches(intersect.object, irony.model);
    if (matches) {
      irony.click();
      break;
    }
  }
}

function ancestorMatches(potential: Object3D | null, model: Object3D) {
  if (!potential) {
    return false;
  }

  if (potential === model) {
    return true;
  }

  return ancestorMatches(potential.parent, model);
}

function onPointerMove( event: any ) {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

export async function initIntersections({camera, scene, renderer}: {camera: Camera, scene: Scene, renderer: WebGLRenderer}) {
  renderer.domElement.addEventListener('click', async () => await onMouseClick({camera, scene}));
}

window.addEventListener( 'pointermove', onPointerMove );
