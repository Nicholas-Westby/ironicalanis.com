import {Raycaster, Vector2, Camera, Scene, Intersection, WebGLRenderer, Object3D} from "three";
import {getInsertedIronies} from "./models";

const raycaster = new Raycaster(),
  pointer = new Vector2(-1, 1);

async function onMouseClick({event, camera, scene}: {event: MouseEvent, camera: Camera, scene: Scene}) {
  if (event.clientX > 0 || event.clientY > 0) {
    setMousePos({x: event.clientX, y: event.clientY});
  }

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

function setMousePos({x, y}: {x: number, y: number}) {
  pointer.x = ( x / window.innerWidth ) * 2 - 1;
  pointer.y = - ( y / window.innerHeight ) * 2 + 1;

  const rotateFactor = 20;
  const rotateX = pointer.y * rotateFactor * 2;
  document.documentElement.style.setProperty('--rotate-x', `${rotateX}deg`);
  const rotateY = (pointer.x - 1) * rotateFactor;
  document.documentElement.style.setProperty('--rotate-y', `${rotateY}deg`);
}

function onPointerMove( event: any ) {
  setMousePos({ x: event.clientX, y: event.clientY });
}

export async function initIntersections({camera, scene, renderer}: {camera: Camera, scene: Scene, renderer: WebGLRenderer}) {
  renderer.domElement.addEventListener('click', async (e) => {
    await onMouseClick({event: e, camera, scene});
  });
}

window.addEventListener( 'pointermove', onPointerMove);
