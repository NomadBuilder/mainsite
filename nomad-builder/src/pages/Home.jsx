import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BuilderCoreScene from '../components/BuilderCoreScene'
import lastFrame from '../assets/last_frame.jpg'
import videoFile from '../assets/Ascend_to_the_Core_Video.mp4'
import transitionVideo from '../assets/Transition.mp4'

export default function Home() {
  const [phase, setPhase] = useState('video') // 'video', 'lastFrame'
  const [videoError, setVideoError] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const navigate = useNavigate()
  const videoRef = useRef(null)

  // Handle video end or near-end
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video && video.duration && video.currentTime >= video.duration - 0.2 && phase === 'video') {
      setPhase('lastFrame')
    }
  }

  // Handle transition video end
  const handleTransitionEnd = () => {
    navigate('/workshop')
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {/* Last Frame Layer (only after video) */}
      <img
        src={lastFrame}
        alt="Last Frame"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 cursor-pointer`}
        style={{
          pointerEvents: phase === 'lastFrame' && !transitioning ? 'auto' : 'none',
          zIndex: 20,
          opacity: phase === 'lastFrame' && !transitioning ? 1 : 0,
          transition: 'opacity 0.7s',
          display: phase === 'lastFrame' ? 'block' : 'none',
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          left: 0,
          top: 0,
        }}
        onClick={() => setTransitioning(true)}
      />
      {/* Animation Overlay (only after video) */}
      {phase === 'lastFrame' && !transitioning && (
        <BuilderCoreScene />
      )}
      {/* Video Layer */}
      <video
        ref={videoRef}
        src={videoFile}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPhase('lastFrame')}
        onError={() => setVideoError(true)}
        style={{
          pointerEvents: 'none',
          zIndex: 40,
          opacity: phase === 'video' && !transitioning ? 1 : 0,
          transition: 'opacity 0.7s',
          display: phase === 'video' ? 'block' : 'none',
          maxWidth: 'none',
          maxHeight: 'none',
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          left: 0,
          top: 0,
        }}
      />
      {/* Fallback if video fails */}
      {videoError && !transitioning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center text-nomad-100">
            <h1 className="text-3xl font-bold mb-2">Video failed to load</h1>
            <p className="text-nomad-300">Please check your assets folder or try reloading the page.</p>
          </div>
        </div>
      )}
      {/* Transition Overlay */}
      {transitioning && (
        <div className="fixed inset-0 w-screen h-screen bg-black z-[1000] flex items-center justify-center transition-opacity duration-700" style={{ opacity: 1 }}>
          <video
            src={transitionVideo}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', left: 0, top: 0 }}
            onEnded={handleTransitionEnd}
          />
        </div>
      )}
    </div>
  )
} 