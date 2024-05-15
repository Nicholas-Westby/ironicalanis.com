import {Scene} from "three";
import {addObject} from "./loader";

export async function addMoney({scene}: {scene: Scene}) {
  const money = await addObject({scene, name: 'money'});
  //TODO: Handle rotation better.
  let rotation = 0;
  let increment = Math.PI / 4.0 / 50.0;
  setInterval(() => {
    rotation += increment;
    money.rotation.x = rotation;
  }, 10);
}
