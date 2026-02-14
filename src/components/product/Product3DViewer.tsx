'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Preload } from '@react-three/drei'
import { Button } from '@/components/ui/Button'
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import * as THREE from 'three'

// Placeholder 3D model component
function TShirtModel({ modelUrl }: { modelUrl?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Auto-rotate the model
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // In a real app, you would load the actual GLTF model
  // const { scene } = useGLTF(modelUrl)

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1.4, 0.1]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

// Loading fallback component
function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-600">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

interface Product3DViewerProps {
  modelUrl?: string
}

export default function Product3DViewer({ modelUrl }: Product3DViewerProps) {
  return (
    <div className="relative">
      {/* 3D Canvas */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />

          <Suspense fallback={<ModelLoader />}>
            <TShirtModel modelUrl={modelUrl} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2}
              maxDistance={5}
              autoRotate={false}
            />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* View Angle Buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button size="sm" variant="outline" className="bg-white/90 text-xs px-2 py-1">
          Front
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 text-xs px-2 py-1">
          Back
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 text-xs px-2 py-1">
          Side
        </Button>
      </div>
    </div>
  )
}