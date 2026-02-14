'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Button } from '@/components/ui/Button'

// Placeholder 3D model component
function TShirtModel() {
  // For now, just a simple box as placeholder
  return (
    <mesh>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <TShirtModel />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Premium 3D
          <span className="block text-indigo-600">T-Shirt Designs</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Experience fashion like never before with our immersive 3D t-shirt collection.
          Each design tells a story, crafted for the modern individual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
            Shop Collection
          </Button>
          <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3">
            Custom Design
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}