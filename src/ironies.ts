import ironies from "./ironies.json";

export type Irony = {
  name: string;
  ironic: boolean;
  times: number[];
  phrase: string;
  model?: string;
};

export async function getIronies() : Promise<Irony[]> {
  return ironies;
}
