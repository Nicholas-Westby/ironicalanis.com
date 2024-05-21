import {Mesh, MeshStandardMaterial, PlaneGeometry, Scene} from "three";
import {loadShaderFile} from "./shaders";

const timeMaterials: any[] = [];

export function updateTime() {
  timeMaterials.forEach((material: any) => {
    const shader = material.userData.shader;
    if (shader) {
      shader.uniforms.time.value = performance.now() / 1000;
    }
  });
}

export async function addStars({scene}: {scene: Scene}) {
  const vertShader = await loadShaderFile('/assets/shaders/stars/stars.vert');
  const fragShader = await loadShaderFile('/assets/shaders/stars/stars.frag');
  const materialParams = {
  };

  (materialParams as any).onBeforeCompile = (shader: any) => {
    shader.uniforms.time = { value: 0 };
    shader.vertexShader = vertShader;
    shader.fragmentShader = fragShader;
    material.userData.shader = shader;
  };

  const geometry = new PlaneGeometry(),
    material = new MeshStandardMaterial(materialParams),
    mesh = new Mesh(geometry, material);

  timeMaterials.push(material);

  mesh.scale.set(60, 20, 1);
  mesh.rotation.set(30 * Math.PI / 180, 0, 0);
  mesh.position.set(0, 3, -5);

  scene.add(mesh);
}
