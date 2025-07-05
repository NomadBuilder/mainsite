import { useState, useEffect } from 'react'
import VideoIntro from '../components/VideoIntro'
import PortalScene from '../components/PortalScene'

const Home = () => {
  const [showPortal, setShowPortal] = useState(false)

  useEffect(() => {
    // For now, we'll show the portal after a delay
    // In production, this would be triggered by video end
    const timer = setTimeout(() => {
      setShowPortal(true)
    }, 5000) // 5 seconds for demo

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen">
      {!showPortal ? (
        <VideoIntro />
      ) : (
        <PortalScene />
      )}
    </div>
  )
}

export default Home 