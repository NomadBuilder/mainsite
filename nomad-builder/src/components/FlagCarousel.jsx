import React, { useRef } from 'react'

const countries = [
  { name: "Iceland", code: "is" },
  { name: "Morocco", code: "ma" },
  { name: "Pakistan", code: "pk" },
  { name: "United States", code: "us" },
  { name: "Ireland", code: "ie" },
  { name: "Egypt", code: "eg" },
  { name: "Oman", code: "om" },
  { name: "Mexico", code: "mx" },
  { name: "Norway", code: "no" },
  { name: "South Africa", code: "za" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "Dominican Republic", code: "do" },
  { name: "Lithuania", code: "lt" },
  { name: "Namibia", code: "na" },
  { name: "Sri Lanka", code: "lk" },
  { name: "Cuba", code: "cu" },
  { name: "France", code: "fr" },
  { name: "Zimbabwe", code: "zw" },
  { name: "Japan", code: "jp" },
  { name: "Nicaragua", code: "ni" },
  { name: "Netherlands", code: "nl" },
  { name: "Zambia", code: "zm" },
  { name: "China", code: "cn" },
  { name: "Panama", code: "pa" },
  { name: "Spain", code: "es" },
  { name: "Botswana", code: "bw" },
  { name: "South Korea", code: "kr" },
  { name: "Costa Rica", code: "cr" },
  { name: "Portugal", code: "pt" },
  { name: "Ethiopia", code: "et" },
  { name: "Hong Kong", code: "hk" },
  { name: "Colombia", code: "co" },
  { name: "Italy", code: "it" },
  { name: "Kenya", code: "ke" },
  { name: "Ecuador", code: "ec" },
  { name: "Belgium", code: "be" },
  { name: "Tanzania", code: "tz" },
  { name: "Peru", code: "pe" },
  { name: "Switzerland", code: "ch" },
  { name: "United Kingdom", code: "gb" },
  { name: "Greece", code: "gr" },
  { name: "Turkey", code: "tr" },
  { name: "Bulgaria", code: "bg" },
  { name: "Hungary", code: "hu" },
  { name: "Austria", code: "at" }
]

export default function FlagCarousel() {
  const carouselRef = useRef(null)
  let isDown = false
  let startX
  let scrollLeft

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    isDown = true
    carouselRef.current.classList.add('dragging')
    startX = e.pageX - carouselRef.current.offsetLeft
    scrollLeft = carouselRef.current.scrollLeft
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.2 // scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk
  }
  const handleMouseUp = () => {
    isDown = false
    carouselRef.current.classList.remove('dragging')
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  // Touch drag-to-scroll handlers
  const handleTouchStart = (e) => {
    isDown = true
    startX = e.touches[0].pageX - carouselRef.current.offsetLeft
    scrollLeft = carouselRef.current.scrollLeft
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }
  const handleTouchMove = (e) => {
    if (!isDown) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }
  const handleTouchEnd = () => {
    isDown = false
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style>{`
        .flag-carousel {
          margin-top: 2.5rem;
          padding-bottom: 1rem;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          cursor: grab;
        }
        .flag-carousel.dragging {
          cursor: grabbing;
        }
        .flag-carousel::-webkit-scrollbar {
          height: 6px;
        }
        .flag-carousel::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .flag-carousel::-webkit-scrollbar-thumb {
          background: rgba(147,51,234,0.5);
          border-radius: 10px;
        }
        .flag-carousel::-webkit-scrollbar-thumb:hover {
          background: rgba(147,51,234,0.7);
        }
      `}</style>
      <div className="w-full overflow-x-auto">
        <div
          ref={carouselRef}
          className="flag-carousel flex flex-row items-center gap-x-4"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {countries.map(country => (
            <div
              key={country.code}
              className="flag-item w-20 h-20 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center border-4 border-purple-500 ring-2 ring-purple-400/30 shadow-xl transition-transform duration-300 cursor-pointer bg-gray-300 hover:scale-110 hover:brightness-110 hover:shadow-2xl"
              title={country.name}
            >
              <img
                src={`https://flagcdn.com/w160/${country.code}.png`}
                alt={country.name}
                className="w-full h-full object-cover rounded-full"
                draggable={false}
                onError={e => {
                  e.target.src = '/vite.svg';
                  e.target.alt = 'N/A';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 