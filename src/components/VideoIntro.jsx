import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const VideoIntro = () => {
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const navigate = useNavigate()
  const [isVideoEnded, setIsVideoEnded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const overlay = overlayRef.current

    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 1.5) {
        // Start fade overlay in the last 1.5 seconds
        gsap.to(overlay, {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut'
        })
      }
    }

    const handleVideoEnd = () => {
      setIsVideoEnded(true)
      // Transition to workshop after video ends
      setTimeout(() => {
        navigate('/workshop')
      }, 1000)
    }

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('ended', handleVideoEnd)
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [navigate])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fullscreen Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        poster="/placeholder-video.jpg"
      >
        <source src="/intro-video.mp4" type="video/mp4" />
        {/* Fallback content */}
        <div className="absolute inset-0 flex items-center justify-center bg-nomad-800">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-nomad-100 mb-4">
              Nomad Builder
            </h1>
            <p className="text-nomad-300 text-lg">
              Tools from the road. Shaped by experience. Built with AI.
            </p>
          </div>
        </div>
      </video>

      {/* Fade Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none"
      />

      {/* Click to Skip */}
      <button
        onClick={() => navigate('/workshop')}
        className="absolute bottom-8 right-8 px-4 py-2 glass rounded-lg text-nomad-100 hover:bg-white/20 transition-all duration-300"
      >
        Skip Intro
      </button>
    </div>
  )
}

export default VideoIntro 