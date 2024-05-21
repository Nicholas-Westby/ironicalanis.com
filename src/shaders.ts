import {FileLoader} from "three";

export async function loadShaderFile(path: string) {
  const loader = new FileLoader();
  return new Promise((resolve) => {
    loader.load(path, (data => {
      resolve(data);
    }));
  });
}
