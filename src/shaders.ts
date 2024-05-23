import {FileLoader} from "three";

/**
 * Loads the shader from the specified file.
 *
 * @param path The path to the shader file (e.g., "/assets/shaders/star/star.frag").
 */
export async function loadShaderFile(path: string) {
  const loader = new FileLoader();
  return new Promise((resolve) => {
    loader.load(path, (data => {
      resolve(data);
    }));
  });
}
