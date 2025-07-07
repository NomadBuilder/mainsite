import React, { useRef, useEffect, useState } from 'react';
import workshopVideo from '../assets/Workshop.mp4';

const tools = [
  {
    title: 'Wanderlog',
    icon: (
      <svg width="88" height="88" viewBox="0 0 64 64" fill="none" style={{ display: 'block' }}>
        <rect x="12" y="16" width="40" height="32" rx="6" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <rect x="18" y="22" width="28" height="4" rx="2" fill="#fff"/>
        <rect x="18" y="30" width="20" height="4" rx="2" fill="#fff"/>
        <rect x="18" y="38" width="12" height="4" rx="2" fill="#fff"/>
      </svg>
    ),
  },
  {
    title: 'Yummylog',
    icon: (
      <svg width="88" height="88" viewBox="0 0 64 64" fill="none" style={{ display: 'block' }}>
        <ellipse cx="32" cy="44" rx="18" ry="8" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <circle cx="32" cy="28" r="12" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <rect x="28" y="18" width="8" height="8" rx="4" fill="#fff"/>
      </svg>
    ),
  },
  {
    title: 'MeowCheckUp',
    icon: (
      <svg width="88" height="88" viewBox="0 0 64 64" fill="none" style={{ display: 'block' }}>
        <ellipse cx="32" cy="40" rx="16" ry="12" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <circle cx="32" cy="32" r="10" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <ellipse cx="24" cy="24" rx="3" ry="6" fill="#fff"/>
        <ellipse cx="40" cy="24" rx="3" ry="6" fill="#fff"/>
        <ellipse cx="28" cy="36" rx="1.5" ry="2" fill="#fff"/>
        <ellipse cx="36" cy="36" rx="1.5" ry="2" fill="#fff"/>
        <path d="M30 40 Q32 42 34 40" stroke="#fff" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'MyAnimalFriends',
    icon: (
      <svg width="88" height="88" viewBox="0 0 64 64" fill="none" style={{ display: 'block' }}>
        {/* Monkey face: round head, big ears, smile */}
        <circle cx="32" cy="36" r="14" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <ellipse cx="20" cy="32" rx="5" ry="7" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <ellipse cx="44" cy="32" rx="5" ry="7" fill="none" stroke="#fff" strokeWidth="3.5"/>
        <ellipse cx="27" cy="38" rx="2" ry="2.5" fill="#fff"/>
        <ellipse cx="37" cy="38" rx="2" ry="2.5" fill="#fff"/>
        <path d="M28 44 Q32 48 36 44" stroke="#fff" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
];

function WaterRippleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const half_width = width >> 1;
    const half_height = height >> 1;
    const size = width * (height + 2) * 2;
    const delay = 30;
    let oldind = width;
    let newind = width * (height + 3);
    const riprad = 3;
    const ripplemap = new Array(size).fill(0);
    const last_map = new Array(size).fill(0);
    let ripple, texture;
    let running = true;

    // Load the pool image as the texture
    const img = new window.Image();
    img.src = '/pool.png';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      texture = ctx.getImageData(0, 0, width, height);
      ripple = ctx.getImageData(0, 0, width, height);
      run();
    };

    function run() {
      if (!running) return;
      newframe();
      ctx.putImageData(ripple, 0, 0);
      setTimeout(run, delay);
    }

    function disturb(dx, dy) {
      dx = dx | 0;
      dy = dy | 0;
      for (let j = dy - riprad; j < dy + riprad; j++) {
        for (let k = dx - riprad; k < dx + riprad; k++) {
          ripplemap[oldind + (j * width) + k] += 128;
        }
      }
    }

    function newframe() {
      let a, b, data, cur_pixel, new_pixel, old_data;
      let t = oldind; oldind = newind; newind = t;
      let i = 0;
      const _width = width, _height = height, _ripplemap = ripplemap, _last_map = last_map, _rd = ripple.data, _td = texture.data, _half_width = half_width, _half_height = half_height;
      for (let y = 0; y < _height; y++) {
        for (let x = 0; x < _width; x++) {
          let _newind = newind + i, _mapind = oldind + i;
          data = (
            _ripplemap[_mapind - _width] +
            _ripplemap[_mapind + _width] +
            _ripplemap[_mapind - 1] +
            _ripplemap[_mapind + 1]) >> 1;
          data -= _ripplemap[_newind];
          data -= data >> 5;
          _ripplemap[_newind] = data;
          data = 1024 - data;
          old_data = _last_map[i];
          _last_map[i] = data;
          if (old_data !== data) {
            a = (((x - _half_width) * data / 1024) | 0) + _half_width;
            b = (((y - _half_height) * data / 1024) | 0) + _half_height;
            if (a >= _width) a = _width - 1;
            if (a < 0) a = 0;
            if (b >= _height) b = _height - 1;
            if (b < 0) b = 0;
            new_pixel = (a + (b * _width)) * 4;
            cur_pixel = i * 4;
            _rd[cur_pixel] = _td[new_pixel];
            _rd[cur_pixel + 1] = _td[new_pixel + 1];
            _rd[cur_pixel + 2] = _td[new_pixel + 2];
          }
          ++i;
        }
      }
    }

    function handlePointer(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) | 0;
      const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) | 0;
      disturb(x, y);
    }
    canvas.addEventListener('mousemove', handlePointer);
    canvas.addEventListener('mousedown', handlePointer);
    canvas.addEventListener('touchstart', handlePointer);
    // Clean up
    return () => {
      running = false;
      canvas.removeEventListener('mousemove', handlePointer);
      canvas.removeEventListener('mousedown', handlePointer);
      canvas.removeEventListener('touchstart', handlePointer);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        display: 'block',
      }}
    />
  );
}

function ComingSoonModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
    }}>
      <div style={{
        minWidth: 320,
        maxWidth: 400,
        padding: '40px 32px 32px 32px',
        background: 'rgba(255,255,255,0.18)',
        borderRadius: 24,
        boxShadow: '0 8px 48px 0 rgba(31,38,135,0.18)',
        backdropFilter: 'blur(16px)',
        textAlign: 'center',
        position: 'relative',
        border: '1.5px solid rgba(255,255,255,0.25)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(0,0,0,0.12)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          color: '#fff',
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          transition: 'background 0.2s',
        }} aria-label="Close">×</button>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: 32,
          color: '#fff',
          marginBottom: 12,
          letterSpacing: 1,
          textShadow: '0 2px 12px rgba(0,0,0,0.18)',
        }}>Coming Soon</div>
        <div style={{
          color: '#e0e0e0',
          fontSize: 18,
          fontWeight: 400,
          marginTop: 8,
          marginBottom: 0,
          letterSpacing: 0.5,
        }}>
          This tool will be available soon.
        </div>
      </div>
    </div>
  );
}

export default function Pool() {
  const [showContent, setShowContent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Allow horizontal scroll by overriding #root and .App width/height
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.width = 'auto';
    const app = document.querySelector('.App');
    if (app) app.style.width = 'auto';
    if (root) root.style.height = 'auto';
    if (app) app.style.height = 'auto';
    return () => {
      if (root) root.style.width = '';
      if (app) app.style.width = '';
      if (root) root.style.height = '';
      if (app) app.style.height = '';
    };
  }, []);

  if (!showContent) {
    return (
      <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: 'black', zIndex: 9999 }}>
        <video
          src={workshopVideo}
          autoPlay
          playsInline
          muted
          style={{ width: '100vw', height: '100vh', objectFit: 'cover', display: 'block' }}
          onEnded={() => setShowContent(true)}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', position: 'relative' }}>
      <WaterRippleCanvas />
      {/* Fog/Shimmer overlay (below carousel) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, transparent 100%), linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          opacity: 0.7,
          mixBlendMode: 'lighten',
          animation: 'fog-shimmer 14s linear infinite alternate',
        }}
      >
        <style>{`
          @keyframes fog-shimmer {
            0% {
              background-position: 60% 40%, 0% 0%;
              opacity: 0.6;
            }
            100% {
              background-position: 40% 60%, 100% 100%;
              opacity: 0.85;
            }
          }
        `}</style>
      </div>
      {/* Carousel at the bottom */}
      <div
        style={{
          marginTop: 'auto',
          width: '100%',
          overflowX: 'auto',
          zIndex: 100,
          pointerEvents: 'auto',
          background: 'rgba(255,0,0,0.05)', // debug only
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 48,
            WebkitOverflowScrolling: 'touch',
            boxSizing: 'border-box',
            alignItems: 'flex-end',
            pointerEvents: 'auto',
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          {tools.map((tool) => (
            <div
              key={tool.title}
              style={{
                flex: '0 0 auto',
                width: 192,
                height: 192,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 60% 35%, rgba(255,255,255,0.18) 0%, rgba(180,220,255,0.10) 60%, rgba(80,120,180,0.08) 100%)',
                boxShadow: '0 0 32px 8px rgba(120,180,255,0.25), 0 0 64px 16px rgba(80,120,180,0.10)',
                border: '3px solid rgba(200,220,255,0.45)',
                backdropFilter: 'blur(12px)',
                marginBottom: 0,
                marginTop: 0,
                position: 'relative',
                transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
                cursor: 'pointer',
                alignItems: 'flex-end',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.boxShadow = '0 0 48px 16px rgba(120,180,255,0.35), 0 0 96px 32px rgba(80,120,180,0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 32px 8px rgba(120,180,255,0.25), 0 0 64px 16px rgba(80,120,180,0.10)';
              }}
              onClick={() => setModalOpen(true)}
            >
              {/* Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 110,
                width: '100%',
                position: 'relative',
                marginBottom: 0,
                marginTop: 12,
              }}>
                {tool.icon}
              </div>
              {/* Inner glassy highlight */}
              <div style={{
                position: 'absolute',
                top: 32,
                left: 48,
                width: 96,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
                filter: 'blur(2px)',
                opacity: 0.7,
                pointerEvents: 'none',
              }} />
              <div
                style={{
                  marginBottom: 16,
                  padding: '4px 16px',
                  background: 'rgba(0,0,0,0.6)',
                  borderRadius: 9999,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  zIndex: 2,
                  position: 'relative',
                  width: 'fit-content',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {tool.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Minimal Social/Contact Icons */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 16,
        zIndex: 5000,
      }}>
        <a
          href="https://www.linkedin.com/in/aazirmunir/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(0,0,0,0.55)',
            transition: 'background 0.2s',
            padding: 10,
            borderRadius: '50%',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#fff" fillOpacity="0.08"/><path d="M14 17v10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="14" cy="14" r="2" fill="#fff"/><path d="M20 25v-3c0-1.657 1.343-3 3-3s3 1.343 3 3v3m0 5v-5m-6 5v-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </a>
        <a
          href="mailto:aazirmun@gmail.com"
          style={{
            background: 'rgba(0,0,0,0.55)',
            transition: 'background 0.2s',
            padding: 10,
            borderRadius: '50%',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#fff" fillOpacity="0.08"/><path d="M11 16l9 6 9-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><rect x="11" y="16" width="18" height="12" rx="3" stroke="#fff" strokeWidth="2.5"/></svg>
        </a>
      </div>
    </div>
  );
} 