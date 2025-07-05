import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [coords, setCoords] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e) => {
      if (
        e.target.closest('[data-cursor="hover"], .cursor-hover, button, a, input, textarea')
      ) {
        setHovered(true)
      }
    }
    const handleMouseOut = (e) => {
      if (
        e.target.closest('[data-cursor="hover"], .cursor-hover, button, a, input, textarea')
      ) {
        setHovered(false)
      }
    }
    const handleMouseDown = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 200)
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.body.style.cursor = 'none'
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.body.style.cursor = ''
    }
  }, [])

  const baseSize = 32
  const scale = clicked ? 2.2 : hovered ? 1.7 : 1
  const boxShadow = clicked
    ? '0 0 48px 24px rgba(168,85,247,0.45), 0 0 0 4px #fff6, 0 0 0 12px #fff2'
    : hovered
    ? '0 0 32px 12px rgba(168,85,247,0.25), 0 0 0 2px #fff4, 0 0 0 8px #fff1'
    : '0 0 24px 8px rgba(255,255,255,0.13)'
  // Offset so the scaled cursor is always centered on the mouse
  const offset = (baseSize * scale) / 2

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: baseSize,
        height: baseSize,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0.01) 100%)',
        boxShadow,
        transform: `translate3d(${coords.x - offset}px, ${coords.y - offset}px, 0) scale(${scale})`,
        transition: 'box-shadow 0.18s cubic-bezier(.4,2,.6,1), transform 0.13s cubic-bezier(.4,2,.6,1)',
        mixBlendMode: 'screen',
        opacity: 0.95,
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    />
  )
} 