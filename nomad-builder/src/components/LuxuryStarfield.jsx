import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { animated as a } from '@react-spring/three'
import StarMesh from './StarMesh'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import starWhiteIcon from '../assets/star-white-icon.png'
import transparentStar from '../assets/transparent-star.png'
import ShaderStar from './ShaderStar'

// Gradient Nebula Background as a mesh
function NebulaBackground() {
  const mesh = useRef()
  // Custom gradient material using a shader
  const fragmentShader = `
    varying vec2 vUv;
    void main() {
      vec3 top = vec3(24.0/255.0, 16.0/255.0, 64.0/255.0); // deep violet
      vec3 bottom = vec3(8.0/255.0, 16.0/255.0, 48.0/255.0); // midnight blue
      float grad = smoothstep(0.0, 1.0, vUv.y);
      vec3 color = mix(bottom, top, grad);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [])
  return (
    <mesh ref={mesh} position={[0,0,-100]} scale={[200,120,1]}>
      <planeGeometry args={[1,1,64,64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// Utility to create a soft circular alpha map as a DataTexture
function createCircleAlphaMap(size = 64) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

// Parallax and twinkle starfield
function ParallaxStars({ count, radius, depth, size, zOffset=0, baseOpacity=1, shimmer=0, shimmerSpeed=1 }) {
  const alphaMap = useMemo(() => createCircleAlphaMap(64), [])
  const [layerOpacity, setLayerOpacity] = useState(baseOpacity)
  const pointsRef = useRef()
  // Generate all star positions
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      const rad = Math.random() * radius
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      const x = rad * Math.sin(phi) * Math.cos(theta)
      const y = rad * Math.sin(phi) * Math.sin(theta)
      const z = zOffset + (Math.random() - 0.5) * depth
      pos.push(x, y, z)
    }
    return new Float32Array(pos)
  }, [count, radius, depth, zOffset])
  useFrame(({ clock }) => {
    if (shimmer > 0) {
      setLayerOpacity(baseOpacity + shimmer * Math.sin(clock.getElapsedTime() * shimmerSpeed))
    }
  })
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#fff"
        size={size}
        sizeAttenuation
        transparent
        opacity={layerOpacity}
        depthWrite={false}
        alphaMap={alphaMap}
        alphaTest={0.01}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  )
}

// Animated special star component
function SpecialStar({ position, baseScale = 0.003 + Math.random() * 0.001, twinkleSpeed = 1, twinklePhase = 0 }) {
  // Animate scale and clamp to min 0.002, max 0.004
  const { scale } = useSpring({
    from: { scale: baseScale },
    to: async (next) => {
      for (;;) {
        await next({
          scale: baseScale * (1 + 0.7 * Math.sin((Date.now() / 1000) * twinkleSpeed + twinklePhase)),
        })
      }
    },
    config: { mass: 1, tension: 60, friction: 18 },
  })
  const clampedScale = scale.to(s => Math.min(Math.max(s, 0.002), 0.004))
  return (
    <ShaderStar
      position={position}
      scale={clampedScale}
      color="#fff"
      points={5}
      twinkleSpeed={twinkleSpeed}
      glow={1}
    />
  )
}

export default function LuxuryStarfield({ className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, #2a1850 0%, #181a2a 70%, rgba(10,10,20,0.0) 100%)',
        ...style,
      }}
    >
      {/* Cinematic vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)',
      }} />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ width: '100%', height: '100%', background: 'transparent', pointerEvents: 'auto' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color={0xffffff} />
        {/* Parallax star layers */}
        <ParallaxStars count={18000} radius={100} depth={60} size={0.014} zOffset={-10} baseOpacity={1} shimmer={0} />
        <ParallaxStars count={8000} radius={80} depth={40} size={0.018} zOffset={0} baseOpacity={1} shimmer={0} />
        {/* Subtle, small luxury sparkle stars */}
        {Array.from({length: 12}).map((_, i) => {
          const x = (Math.random() - 0.5) * 10;
          const y = (Math.random() - 0.5) * 6;
          const z = -7 - Math.random() * 3;
          return (
            <SpecialStar
              key={i}
              position={[x, y, z]}
              baseScale={0.008 + Math.random() * 0.004}
              twinkleSpeed={0.7 + Math.random() * 1.2}
              twinklePhase={Math.random() * Math.PI * 2}
            />
          );
        })}
        {/* Faint, rotated Milky Way band */}
        <group rotation={[Math.PI / 5, 0, 0]}>
          {/* Optionally, add a few bright 'special' stars here as separate meshes for sparkle */}
        </group>
        {/* TODO: Add shooting star and glowing particles here */}
        <fog attach="fog" args={["#1a1a2a", 8, 30]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.12}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI - Math.PI / 3.2}
          makeDefault
        />
      </Canvas>
    </div>
  )
} 