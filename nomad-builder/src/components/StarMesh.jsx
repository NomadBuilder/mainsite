import { Shape } from 'three'
import { useMemo } from 'react'

function createStarShape(points = 5, outerRadius = 1, innerRadius = 0.5) {
  const shape = new Shape()
  const step = Math.PI / points
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius
    const a = i * step - Math.PI / 2
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  shape.closePath()
  return shape
}

export default function StarMesh({ points = 5, outerRadius = 0.1, innerRadius = 0.04, color = 'white', opacity = 0.9, ...props }) {
  const shape = useMemo(() => createStarShape(points, outerRadius, innerRadius), [points, outerRadius, innerRadius])
  return (
    <mesh {...props}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
} 