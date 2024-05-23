import {Mesh, MeshStandardMaterial, PlaneGeometry, Scene, Vector2} from "three";
import {loadShaderFile} from "./shaders";

const timeMaterials: MeshStandardMaterial[] = [];

let mesh: Mesh;

/**
 * Returns the star mesh.
 */
export function getMesh(): Mesh {
  return mesh;
}

/**
 * Updates the time that is used to animate the star field.
 */
export function updateTime() {
  timeMaterials.forEach((material: any) => {
    const shader = material.userData.shader;
    if (shader) {
      shader.uniforms.time.value = performance.now() / 1000;
    }
  });
}

/**
 * Adds the star field mesh to the scene.
 *
 * @param scene The scene to add the star field to.
 */
export async function addStars({scene}: {scene: Scene}) {
  const vertShader = await loadShaderFile('/assets/shaders/stars/stars.vert');
  const fragShader = await loadShaderFile('/assets/shaders/stars/stars.frag');
  const materialParams = {};

  (materialParams as any).onBeforeCompile = (shader: any) => {
    shader.uniforms.time = { value: 0 };
    shader.uniforms.mouseUv = { value: new Vector2(0, 0) };
    shader.vertexShader = vertShader;
    shader.fragmentShader = fragShader;
    material.userData.shader = shader;
  };

  const geometry = new PlaneGeometry(),
    material = new MeshStandardMaterial(materialParams);

  mesh = new Mesh(geometry, material);

  timeMaterials.push(material);

  mesh.scale.set(60, 20, 1);
  mesh.rotation.set(30 * Math.PI / 180, 0, 0);
  mesh.position.set(0, 3, -5);

  scene.add(mesh);
}
