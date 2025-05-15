"use client"

import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { type Group, type Mesh, MeshStandardMaterial } from "three"

interface ProductModelProps {
  color: string
  scale: number
  variant: string
}

export function ProductModel({ color, scale, variant }: ProductModelProps) {
  const group = useRef<Group>(null)
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb") as any

  // Rotate the model slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  // Apply different materials based on variant
  const getMaterial = () => {
    const material = new MeshStandardMaterial({ color: color })

    if (variant === "premium") {
      material.metalness = 0.7
      material.roughness = 0.2
    } else if (variant === "enterprise") {
      material.metalness = 0.9
      material.roughness = 0.1
      material.emissive.set(color)
      material.emissiveIntensity = 0.2
    } else {
      material.metalness = 0.1
      material.roughness = 0.8
    }

    return material
  }

  return (
    <group ref={group} dispose={null} scale={scale}>
      <mesh geometry={(nodes.LOD3spShape as Mesh).geometry} material={getMaterial()} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}
