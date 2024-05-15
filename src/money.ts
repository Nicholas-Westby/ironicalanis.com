import {Scene} from "three";
import {addObject} from "./loader";

export async function addMoney({scene}: {scene: Scene}) {
  await addObject({scene, name: 'money'});
}
