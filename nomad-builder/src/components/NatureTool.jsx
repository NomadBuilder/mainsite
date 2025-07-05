import { useRef, useState } from 'react'
import { Float, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

export default function NatureTool({ tool, position, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Organic shape based on type
  let geometry
  switch (tool.type) {
    case 'leaf':
      geometry = <sphereGeometry args={[0.35, 24, 16]} />
      break
    case 'stone':
      geometry = <icosahedronGeometry args={[0.45, 1]} />
      break
    case 'fern':
      geometry = <torusGeometry args={[0.28, 0.09, 16, 32]} />
      break
    case 'crystal':
      geometry = <octahedronGeometry args={[0.38, 0]} />
      break
    case 'fruit':
      geometry = <sphereGeometry args={[0.32, 20, 20]} />
      break
    case 'moss':
      geometry = <dodecahedronGeometry args={[0.28, 0]} />
      break
    default:
      geometry = <sphereGeometry args={[0.3, 16, 12]} />
  }

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}
      floatIntensity={0.25 + Math.random() * 0.2}
      position={position}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={hovered ? 1.13 : 1}
        castShadow
        receiveShadow
      >
        {geometry}
        <meshPhysicalMaterial
          color={tool.color}
          transmission={0.7}
          roughness={0.25}
          thickness={0.7}
          ior={1.3}
          clearcoat={0.7}
          clearcoatRoughness={0.2}
          metalness={0.1}
          emissive={hovered ? tool.color : '#222'}
          emissiveIntensity={hovered ? 0.7 : 0.18}
          opacity={0.95}
          transparent
        />
        {/* Ripple/Glow on hover */}
        {hovered && (
          <mesh scale={1.25}>
            {geometry}
            <meshBasicMaterial color={tool.color} transparent opacity={0.18} />
          </mesh>
        )}
      </mesh>
      {/* Insight text appears like a whisper */}
      <AnimatePresence>
        {hovered && (
          <Html position={[0, 0.7, 0]} center style={{ pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="px-3 py-2 rounded-xl bg-black/60 text-nomad-100 text-base shadow-lg font-mono" style={{whiteSpace:'nowrap'}}>
                <span className="block font-bold text-lg mb-1 tracking-wide text-shadow">{tool.name}</span>
                <span className="italic text-nomad-300 text-sm">{tool.insight}</span>
              </div>
            </motion.div>
          </Html>
        )}
      </AnimatePresence>
    </Float>
  )
} 