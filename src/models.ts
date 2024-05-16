import {Group, Scene} from 'three';
import {getIronies, Irony} from "./ironies";
import {addObject} from "./loader";

type IronyInSpace = {
  model: Group;
  times: number[];
};

const insertedIronies: IronyInSpace[] = [];

const ironies = await getIronies();

export async function getInsertedIronies(): Promise<IronyInSpace[]> {
  return insertedIronies;
}

export async function addIronies({scene}: {scene: Scene}) {
  for(const x of ironies) {
    const irony = x;
    await addIrony({scene, irony});
  }
}

async function addIrony({scene, irony}: {scene: Scene, irony: Irony}) {
  if (!irony.model) {
    return;
  }
  const model = await addObject({scene, name: irony.model});
  insertedIronies.push({
    model,
    times: irony.times,
  });
}
