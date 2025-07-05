import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AmbientParticles from '../components/AmbientParticles'

const playfair = 'Playfair Display, serif'
const inter = 'Inter, sans-serif'

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.32, 0.12])
  const mistY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0D0D0D] to-[#181A1B] overflow-x-hidden text-white font-sans"
      style={{ fontFamily: inter }}
    >
      <AmbientParticles subtle />
      <motion.div
        className="pointer-events-none fixed inset-0 z-10"
        style={{ opacity: mistOpacity, y: mistY, background: 'radial-gradient(ellipse at 50% 80%, rgba(200,255,255,0.06) 0%, transparent 80%)' }}
      />
      {/* ...rest of the About page code (scenes, sections, etc.)... */}
    </div>
  )
} 