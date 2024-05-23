import ironies from "./data/ironies.json";

/**
 * The data associated with an irony (i.e., the times in which they appear throughout the video,
 * as well as the name of the 3D model).
 */
export type Irony = {
  times: number[];
  model?: string;
};

/**
 * Retrieves the list of ironies from the JSON file.
 */
export async function getIronies() : Promise<Irony[]> {
  return ironies;
}
