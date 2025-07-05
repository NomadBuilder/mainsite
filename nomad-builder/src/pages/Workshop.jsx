import './WorkshopCustom.css'
import profileImg from '../assets/Profile.png'
import LuxuryStarfield from '../components/LuxuryStarfield'
import CustomCursor from '../components/CustomCursor'
import FlagCarousel from '../components/FlagCarousel'

export default function Workshop() {
  return (
    <>
      <CustomCursor />
      <div id="content-wrapper">
        {/* SECTION 1: Identity + Hero */}
        <section className="section hero-section min-h-screen flex flex-col justify-center items-center p-6 md:p-16 relative">
          <LuxuryStarfield />
          <div className="flex flex-col flex-grow w-full h-full max-w-4xl text-center justify-center items-center" style={{position: 'relative', zIndex: 1}}>
            <p className="text-white text-5xl md:text-7xl lg:text-8xl font-bold font-playfair mb-10">
              Nomad Builder
            </p>
            <p className="text-white text-3xl md:text-4xl lg:text-5xl font-inter mb-6">
              Independent tools shaped by experience.
            </p>
            <p className="text-white text-3xl md:text-4xl lg:text-5xl font-inter mb-10">
              Built with AI. Shared to make sense of it all.
            </p>
          </div>
          {/* Animated scroll cue at the bottom of the flex column */}
          <div className="flex flex-col items-center mt-auto mb-8 z-10">
            <div className="mb-3 text-white text-2xl md:text-3xl font-inter font-semibold opacity-90">Scroll to explore</div>
            <div>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 14V42" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
                <path d="M18 32L28 42L38 32" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </section>
        {/* SECTION 2: Journey + Studio */}
        <section className="section studio-section min-h-screen flex flex-col items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-24">
              <div className="max-w-lg w-full text-center md:text-left mb-12 md:mb-0" style={{ paddingRight: '90px' }}>
                <p className="text-2xl md:text-4xl font-playfair font-bold tracking-tight mb-10">
                  I’ve spent the past few years living and working around the world (40+ countries) as a digital nomad.
                </p>
                <p className="text-xl md:text-2xl font-inter leading-loose mb-10">
                  Not just passing through, but paying attention. I’ve seen how different systems shape how we live, connect, and create meaning.
                </p>
                <p className="text-xl md:text-2xl font-inter leading-loose mb-8">
                  That lens has reshaped how I think about design, technology, and purpose. Nomad Builder is a personal studio for building small, focused tools — each one a reflection of what I’ve learned along the way.
                </p>
              </div>
              <div className="flex-shrink-0 min-w-[5rem] flex flex-col items-center justify-end md:ml-8 lg:ml-12 xl:ml-20 self-end">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden mb-6 border-2 border-purple-600 shadow-xl relative">
                  <img src={profileImg} alt="Aazir Munir" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black opacity-10 rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-white text-2xl md:text-3xl font-playfair font-bold">Aazir Munir</p>
                  <p className="text-gray-400 text-lg md:text-xl font-inter">Product thinker, builder, global wanderer</p>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <FlagCarousel />
            </div>
          </div>
        </section>
        {/* SECTION 3: Intent + CTA */}
        <section className="section cta-section min-h-screen flex flex-col items-center justify-center p-6 md:p-16 relative">
          <LuxuryStarfield />
          <div className="max-w-4xl text-white text-center mb-12 flex flex-col flex-grow justify-center items-center" style={{position: 'relative', zIndex: 1, minHeight: '25vh'}}>
            <p className="text-2xl md:text-4xl font-playfair font-bold tracking-tight mb-10">
              This isn’t about launching companies.
            </p>
            <p className="text-xl md:text-2xl font-inter leading-loose mb-8 md:mb-12">
              It’s about building fast and with intent — turning sharp insights into tangible, shareable tools.
            </p>
            <p className="text-xl md:text-2xl font-inter leading-loose mb-10 md:mb-16">
              This space will grow — one tool at a time.
            </p>
            <div className="w-full flex justify-center mt-16">
              <button id="ctaButton" className="bg-purple-600 text-white py-4 px-8 rounded-full text-2xl font-bold transition-all duration-300 transform-gpu relative overflow-hidden group" style={{zIndex: 1}}>
                <span className="relative z-10">Enter the Workshop</span>
                <span className="absolute inset-0 bg-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              </button>
            </div>
          </div>
        </section>
        {/* Minimal Social/Contact Icons */}
        <div className="fixed bottom-4 left-4 flex flex-col items-start gap-3 z-50">
          <a href="https://www.linkedin.com/in/aazirmunir" target="_blank" rel="noopener noreferrer" className="bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-lg">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="14" fill="#fff" fillOpacity="0.08"/><path d="M9.5 11.5v7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="9.5" cy="9" r="1.25" fill="#fff"/><path d="M13.5 15.5v-2c0-1.104.896-2 2-2s2 .896 2 2v2m0 3v-3m-4 3v-3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </a>
          <a href="mailto:aazir@nomadbuilder.com" className="bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-lg">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="14" fill="#fff" fillOpacity="0.08"/><path d="M7 10l7 5 7-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><rect x="7" y="10" width="14" height="8" rx="2" stroke="#fff" strokeWidth="2"/></svg>
          </a>
        </div>
      </div>
      {/* Luxury CTA at the very bottom removed as requested */}
    </>
  )
} 