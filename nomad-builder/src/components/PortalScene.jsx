import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Stars } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Core({ onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color={hovered ? '#667eea' : '#475569'}
          emissive={hovered ? '#667eea' : '#1e293b'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glowing particles around the core */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 2 / 12) * 4,
            Math.sin(i * Math.PI * 2 / 12) * 4,
            0
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color="#667eea"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </Float>
  )
}

function PortalScene() {
  const navigate = useNavigate()

  const handleCoreClick = () => {
    navigate('/workshop')
  }

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="bg-nomad-900"
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#667eea" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        <Core onClick={handleCoreClick} />
        
        <Html position={[0, -4, 0]} center>
          <div className="text-center text-nomad-100">
            <h2 className="text-2xl font-bold mb-2">Builder's Core</h2>
            <p className="text-nomad-300 text-sm">Click to enter the workshop</p>
          </div>
        </Html>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default PortalScene 