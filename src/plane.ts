import * as THREE from "three"

import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"
import { Size } from "./types/types"

interface Props {
  scene: THREE.Scene
  sizes: Size
}

export default class Plane {
  scene: THREE.Scene
  geometry: THREE.PlaneGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Mesh
  sizes: Size

  constructor({ scene, sizes }: Props) {
    this.scene = scene
    this.sizes = sizes

    this.createGeometry()
    this.createMaterial()
    this.createMesh()
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.sizes.width, this.sizes.height)
  }

  createMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uViewportRes: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    })
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render(time: number) {
    this.material.uniforms.uTime.value = time
  }
}
