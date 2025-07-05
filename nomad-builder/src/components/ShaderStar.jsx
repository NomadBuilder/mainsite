import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Luxury star shader: sharp points, glow, twinkle
const fragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float points;
  uniform float glow;
  varying vec2 vUv;
  
  float star(vec2 uv, float points, float inner, float outer) {
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    float spikes = abs(cos(points * angle));
    float r = mix(inner, outer, spikes);
    return smoothstep(r, r + 0.01, radius);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float twinkle = 0.7 + 0.3 * sin(time * 2.0);
    float s = 1.0 - star(uv, points, 0.18 * twinkle, 0.7);
    float glowEdge = smoothstep(0.7, 1.0, length(uv));
    vec3 col = color * s + color * 0.5 * (1.0 - glowEdge) * glow;
    float alpha = s + 0.4 * (1.0 - glowEdge) * glow;
    gl_FragColor = vec4(col, alpha * twinkle);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export default function ShaderStar({ position = [0,0,0], scale = 0.02, color = '#fff', points = 6, twinkleSpeed = 1, glow = 1 }) {
  const mesh = useRef()
  const material = useRef()
  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.time.value = state.clock.getElapsedTime() * twinkleSpeed
    }
  })
  // Clamp scale to max 0.03 for editorial sparkle size
  const clampedScale = Math.min(typeof scale === 'number' ? scale : scale.get(), 0.009)
  return (
    <mesh ref={mesh} position={position} scale={[clampedScale, clampedScale, clampedScale]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(color) },
          points: { value: points },
          glow: { value: glow },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
} 