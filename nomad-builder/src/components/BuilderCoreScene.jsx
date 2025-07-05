import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BuilderCoreScene() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const newSparkles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 80,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 8 + Math.random() * 12,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Magical floating sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: `${sparkle.x}vw`,
            top: `${sparkle.y}vh`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: '#67e8f9',
            borderRadius: '50%',
            boxShadow: '0 0 16px 4px #67e8f9',
            zIndex: 10,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.7, 0],
            scale: [0.5, 1.2, 1, 0.5],
            y: [-10, -30, -10, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
} 