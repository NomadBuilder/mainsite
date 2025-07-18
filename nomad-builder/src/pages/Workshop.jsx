import './WorkshopCustom.css'
import profileImg from '../assets/profile.png'
import LuxuryStarfield from '../components/LuxuryStarfield'
import CustomCursor from '../components/CustomCursor'
import FlagCarousel from '../components/FlagCarousel'
import { useEffect, useState } from 'react'

export default function Workshop() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cue = document.getElementById('scroll-cue');
    const handler = () => {
      const nextSection = document.querySelector('.studio-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
    if (cue) {
      cue.addEventListener('click', handler);
      cue.style.pointerEvents = 'auto';
      cue.style.cursor = 'pointer';
    }
    return () => {
      if (cue) cue.removeEventListener('click', handler);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

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
          {/* Pure CSS scroll cue placeholder */}
          <div id="scroll-cue">
            <span id="scroll-cue-text">Scroll to explore</span>
            <span id="scroll-cue-arrow">
              <svg viewBox="0 0 36 36" fill="none">
                <path d="M18 10V26" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                <path d="M12 20L18 26L24 20" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          {/* Minimal luxury scroll cue */}
        </section>
        {/* SECTION 2: Journey + Studio */}
        <section className="section studio-section min-h-screen flex flex-col items-center justify-center p-6 md:p-16 overflow-x-hidden">
          <div className="w-full md:max-w-4xl md:mx-auto overflow-x-hidden">
            {/* Mobile layout: stacked column, only visible on mobile */}
            <div className="flex flex-col w-full max-w-full md:hidden box-border overflow-x-hidden">
              <div className="w-full max-w-full text-center mb-8 box-border overflow-x-visible px-1">
                <p className="text-2xl font-playfair font-bold tracking-tight mb-8 break-words w-full max-w-full overflow-visible">
                  I've spent the past few years living and working around the world (40+ countries) as a digital nomad.
                </p>
                <p className="text-xl font-inter leading-loose mb-8 break-words w-full max-w-full overflow-visible">
                  Not just passing through, but paying attention. I've seen how different systems shape how we live, connect, and create meaning.
                </p>
                <p className="text-xl font-inter leading-loose mb-6 break-words w-full max-w-full overflow-visible">
                  That lens has reshaped how I think about design, technology, and purpose. Nomad Builder is a personal studio for building small, focused tools — each one a reflection of what I've learned along the way.
                </p>
              </div>
              <div className="w-full max-w-full flex flex-col items-center justify-center mb-8 box-border overflow-x-hidden">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-2 border-purple-600 shadow-xl relative">
                  <img src={profileImg} alt="Aazir Munir" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black opacity-10 rounded-full"></div>
                </div>
                <div className="text-center max-w-full w-full">
                  <p className="text-white text-2xl font-playfair font-bold break-words w-full max-w-full overflow-visible">Aazir Munir</p>
                  <p className="text-gray-400 text-lg font-inter break-words w-full max-w-full overflow-visible">Product thinker, builder, global wanderer</p>
                </div>
              </div>
              <div className="w-full mt-4 box-border max-w-full overflow-x-auto">
                <div style={{ minWidth: 0, width: '100%' }}>
                  <FlagCarousel />
                </div>
              </div>
            </div>
            {/* Desktop layout: row, only visible on md+ */}
            <div className="hidden md:flex flex-row items-start justify-between gap-24 w-full box-border">
              <div className="max-w-lg w-full text-left mb-0 md:pr-[90px] box-border">
                <p className="text-4xl font-playfair font-bold tracking-tight mb-10">
                  I've spent the past few years living and working around the world (40+ countries) as a digital nomad.
                </p>
                <p className="text-2xl font-inter leading-loose mb-10">
                  Not just passing through, but paying attention. I've seen how different systems shape how we live, connect, and create meaning.
                </p>
                <p className="text-2xl font-inter leading-loose mb-8">
                  That lens has reshaped how I think about design, technology, and purpose. Nomad Builder is a personal studio for building small, focused tools — each one a reflection of what I've learned along the way.
                </p>
              </div>
              <div className="flex-shrink-0 min-w-[5rem] flex flex-col items-center justify-end md:ml-8 lg:ml-12 xl:ml-20 self-end mt-0 box-border">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-purple-600 shadow-xl relative">
                  <img src={profileImg} alt="Aazir Munir" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black opacity-10 rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-white text-3xl font-playfair font-bold">Aazir Munir</p>
                  <p className="text-gray-400 text-xl font-inter">Product thinker, builder, global wanderer</p>
                </div>
              </div>
            </div>
            {/* Flag carousel always full width below on desktop */}
            <div className="hidden md:block w-full mt-8 box-border">
              <FlagCarousel />
            </div>
          </div>
        </section>
        {/* SECTION 3: Intent + CTA */}
        <section className="section cta-section min-h-screen flex flex-col items-center justify-center p-6 md:p-16 relative">
          <LuxuryStarfield />
          <div className="max-w-4xl text-white text-center mb-12 flex flex-col flex-grow justify-center items-center" style={{position: 'relative', zIndex: 1, minHeight: '25vh'}}>
            <p className="text-2xl md:text-4xl font-playfair font-bold tracking-tight mb-10">
              This isn't about launching companies.
            </p>
            <p className="text-xl md:text-2xl font-inter leading-loose mb-8 md:mb-12">
              It's about building fast and with intent — turning sharp insights into tangible, shareable tools.
            </p>
            <p className="text-xl md:text-2xl font-inter leading-loose mb-10 md:mb-16">
              This space will grow — one tool at a time.
            </p>
            <div className="w-full flex justify-center mt-16">
              <button id="ctaButton" className="bg-purple-600 text-white py-4 px-8 rounded-full text-2xl font-bold transition-all duration-300 transform-gpu relative overflow-hidden group" style={{zIndex: 1}} onClick={openModal}>
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

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div className="modal-stars">
            <div className="modal-star"></div>
            <div className="modal-star"></div>
            <div className="modal-star"></div>
            <div className="modal-star"></div>
            <div className="modal-star"></div>
          </div>

          <h2 className="modal-title">Full Workshop coming soon!</h2>
          <p className="modal-description">
            Check out the first tool here: <a 
              href="https://www.nomadbuilder.io/wanderlog_ai/splash.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="modal-inline-link"
            >
              https://www.nomadbuilder.io/wanderlog_ai/splash.html
            </a>
          </p>
          <p className="modal-description">
            WanderLog AI is your intelligent travel storytelling companion — designed to take the thinking out of travel journaling.
          </p>
          <a 
            href="https://www.nomadbuilder.io/wanderlog_ai/splash.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal-link"
          >
            WanderLog AI
          </a>
        </div>
      </div>
    </>
  )
} 
