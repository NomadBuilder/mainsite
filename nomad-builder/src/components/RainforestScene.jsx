import { Canvas, useThree } from '@react-three/fiber'
import { Stars, Sparkles, Html, Float } from '@react-three/drei'
import NatureTool from './NatureTool'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Organic, non-grid positions for tools
const toolPositions = [
  [0, 0.2, 0],
  [-1.2, -0.1, -0.6],
  [1.1, 0.05, -0.7],
  [-0.7, 0.3, 1.1],
  [0.8, -0.2, 1.2],
  [0, -0.4, -1.3],
]

// Background flora (non-interactive)
const backgroundFlora = [
  { type: 'fern', color: '#6ee7b7', position: [-2, -0.7, -2], scale: 1.2 },
  { type: 'moss', color: '#a7f3d0', position: [2, -0.8, -1.5], scale: 1.1 },
  { type: 'stone', color: '#b2a27a', position: [-1.7, -0.9, 1.5], scale: 1.3 },
]

function RainforestContent({ tools, onToolClick }) {
  const groupRef = useRef()
  const [timeOfDay, setTimeOfDay] = useState('dawn') // 'dawn' | 'dusk'
  const [bloomIn, setBloomIn] = useState(false)
  const { size, camera } = useThree()

  // Responsive camera for portrait/desktop
  useEffect(() => {
    camera.position.set(0, 0.2, size.width < 700 ? 4.2 : 3.2)
    camera.fov = size.width < 700 ? 70 : 55
    camera.updateProjectionMatrix()
  }, [size, camera])

  // Parallax on pointer move
  const handlePointerMove = (e) => {
    if (!groupRef.current) return
    const x = (e.clientX / size.width - 0.5) * 0.7
    const y = (e.clientY / size.height - 0.5) * 0.5
    groupRef.current.position.x = x
    groupRef.current.position.y = -y
  }

  // Animate tool bloom-in on entry
  useEffect(() => {
    setTimeout(() => setBloomIn(true), 400)
  }, [])

  // Time-of-day color shift
  useEffect(() => {
    setTimeOfDay(Math.random() > 0.5 ? 'dawn' : 'dusk')
  }, [])

  // Mist planes
  function MistPlane({ y, opacity, scale = 1 }) {
    return (
      <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial color="#e0f7fa" transparent opacity={opacity} />
      </mesh>
    )
  }

  // Animated light rays (simple planes with animated opacity)
  function LightRay({ x, y, z, delay }) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const t = setTimeout(() => setVisible(true), delay)
      return () => clearTimeout(t)
    }, [delay])
    return visible ? (
      <mesh position={[x, y, z]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={[1.2, 4]} />
        <meshBasicMaterial color="#fffbe6" transparent opacity={0.13} />
      </mesh>
    ) : null
  }

  // Dawn/dusk color
  const bgGradient = timeOfDay === 'dawn'
    ? 'from-[#b5f3ff] via-[#a7f3d0] to-[#1a2c1a]'
    : 'from-[#fbbf24] via-[#b2a27a] to-[#2e3c2e]'

  return (
    <group onPointerMove={handlePointerMove}>
      {/* Background color and fog */}
      <color attach="background" args={[timeOfDay === 'dawn' ? '#b5f3ff' : '#fbbf24']} />
      <fog attach="fog" args={[timeOfDay === 'dawn' ? '#b5f3ff' : '#fbbf24', 5, 12]} />
      {/* Soft ambient and dappled light */}
      <ambientLight intensity={0.7} color="#e0f7fa" />
      <directionalLight
        position={[2, 6, 4]}
        intensity={1.1}
        color="#b5f3ff"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color="#fff6e0"
      />
      {/* Mist layers */}
      <MistPlane y={-0.2} opacity={0.13} scale={1.2} />
      <MistPlane y={0.5} opacity={0.09} scale={1.5} />
      <MistPlane y={1.1} opacity={0.07} scale={1.8} />
      {/* Light rays */}
      <LightRay x={-1.2} y={1.2} z={-2} delay={400} />
      <LightRay x={1.3} y={1.5} z={-1.5} delay={900} />
      {/* Mist and spores */}
      <Stars radius={10} depth={8} count={800} factor={0.7} fade speed={0.15} saturation={0.1} />
      <Sparkles count={90} scale={[7, 2, 7]} size={2.5} speed={0.3} color="#b5f3ff" />
      {/* Background flora */}
      {backgroundFlora.map((flora, i) => (
        <Float key={i} speed={0.7} floatIntensity={0.08} rotationIntensity={0.1} position={flora.position}>
          <mesh scale={flora.scale}>
            {flora.type === 'fern' && <torusGeometry args={[0.28, 0.09, 16, 32]} />}
            {flora.type === 'moss' && <dodecahedronGeometry args={[0.28, 0]} />}
            {flora.type === 'stone' && <icosahedronGeometry args={[0.45, 1]} />}
            <meshStandardMaterial color={flora.color} roughness={0.7} />
          </mesh>
        </Float>
      ))}
      {/* Flora/cluster group with parallax and bloom-in */}
      <group ref={groupRef}>
        {tools.map((tool, i) => (
          <AnimatePresence key={tool.slug}>
            {bloomIn && (
              <motion.group
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.1, opacity: 0 }}
                transition={{ delay: 0.2 + i * 0.13, duration: 0.7, type: 'spring', bounce: 0.3 }}
              >
                <NatureTool
                  tool={tool}
                  position={toolPositions[i % toolPositions.length]}
                  onClick={() => onToolClick(tool.slug)}
                />
              </motion.group>
            )}
          </AnimatePresence>
        ))}
      </group>
      {/* Optional: light rays or volumetric effect (can be added later) */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer> */}
    </group>
  )
}

export default function RainforestScene({ tools, onToolClick }) {
  // Dawn/dusk color for background gradient
  // (We can't use hooks here, so just use a static gradient)
  return (
    <div className={`w-full h-screen bg-gradient-to-b from-[#b5f3ff] via-[#a7f3d0] to-[#1a2c1a]`}>
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 3.2], fov: 55 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <RainforestContent tools={tools} onToolClick={onToolClick} />
      </Canvas>
    </div>
  )
} 