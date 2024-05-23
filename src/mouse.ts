import {Raycaster, Vector2, Camera, Scene, Intersection, WebGLRenderer, Object3D} from "three";
import {getInsertedIronies} from "./models";

const raycaster = new Raycaster(),
  pointer = new Vector2(-1, 1);

/**
 * When a 3D model irony is clicked, display the corresponding irony information.
 */
async function onMouseClick({event, camera, scene}: {event: MouseEvent, camera: Camera, scene: Scene}) {
  if (event.clientX > 0 || event.clientY > 0) {
    setMousePos({x: event.clientX, y: event.clientY});
  }

  raycaster.setFromCamera(pointer, camera);

  // We only want the closest object clicked (rays go through objects).
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

/**
 * Checks if the clicked object has an ancestor that is the specified model.
 * @param potential The clicked object that may potentially be within the model.
 * @param model The model that may be an ancestor of the clicked object.
 */
function ancestorMatches(potential: Object3D | null, model: Object3D) {
  if (!potential) {
    return false;
  }

  if (potential === model) {
    return true;
  }

  return ancestorMatches(potential.parent, model);
}

/**
 * Updates the stored mouse position according to the specified coordinates.
 * @param x The x coordinate.
 * @param y The y coordinate.
 */
function setMousePos({x, y}: {x: number, y: number}) {
  pointer.x = ( x / window.innerWidth ) * 2 - 1;
  pointer.y = - ( y / window.innerHeight ) * 2 + 1;

  // Rotate the info panel based on the relative position of the mouse (making it look like the
  // panel is pointing toward the mouse).
  const rotateFactor = 20;
  const rotateX = pointer.y * rotateFactor * 2;
  document.documentElement.style.setProperty('--rotate-x', `${rotateX}deg`);
  const rotateY = (pointer.x - 1) * rotateFactor;
  document.documentElement.style.setProperty('--rotate-y', `${rotateY}deg`);

}

/**
 * When the mouse movies, update the stored mouse coordinate.
 */
function onPointerMove( event: any ) {
  setMousePos({ x: event.clientX, y: event.clientY });
}

/**
 * Initializes the mouse click listener that will check for intersections with 3D irony objects.
 */
export async function initIntersections(
  {camera, scene, renderer}: {camera: Camera, scene: Scene, renderer: WebGLRenderer}) {
  renderer.domElement.addEventListener('click', async (e) => {
    await onMouseClick({event: e, camera, scene});
  });
}

// When the mouse moves, store the coordinate.
window.addEventListener( 'pointermove', onPointerMove);
