import {Group, Scene} from 'three';
import {getIronies, Irony} from "./ironies";
import {addIronyObject} from "./loader";

type IronyInSpace = {
  model: Group;
  times: number[];
  click: () => void;
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
  const model = await addIronyObject({scene, name: irony.model});
  insertedIronies.push({
    model,
    times: irony.times,
    click: () => {
      const el = document.querySelector<HTMLElement>(`[data-js-irony="${irony.model}"]`);
      if (!el) {
        return;
      }

      // Hide existing dialogs.
      const allEls = Array.from(document.querySelectorAll<HTMLElement>(`[data-js-irony]`));
      allEls.forEach(x => {
        x.style.setProperty('--irony-position', 'var(--irony-position-initial)');
      });

      // Show selected dialog.
      el.style.setProperty('--irony-position', 'var(--irony-position-visible)');

    },
  });
}
