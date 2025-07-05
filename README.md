# Nomad Builder

✨ **Tools from the road. Shaped by experience. Built with AI. Shared to make sense of it all.**

A digital studio of independent tools and systems — inspired by years of global travel, built at the intersection of AI, design, and lived insight.

This is not a startup. Not a portfolio. This is a creative laboratory for building meaning through technology — one small system at a time.

## 🧭 Site Map

```
/
├── [Video Intro] + [Builder's Core Scene]
├── /workshop
│   └── Grid of tools
├── /tool/:slug
│   └── Immersive tool detail pages
└── /about
    └── Zine-style manifesto
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nomad-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Three.js** - 3D library

## 📁 Project Structure

```
src/
├── components/
│   ├── VideoIntro.jsx      # Fullscreen video with fade transition
│   ├── PortalScene.jsx     # 3D Builder's Core scene
│   ├── ToolTile.jsx        # Workshop grid tiles
│   └── ScrollReveal.jsx    # Scroll-triggered animations
├── pages/
│   ├── Home.jsx            # Landing page with video + portal
│   ├── Workshop.jsx        # Tools gallery
│   ├── ToolDetail.jsx      # Individual tool showcase
│   └── About.jsx           # Philosophy manifesto
├── styles/
│   └── index.css           # Tailwind + custom styles
└── assets/
    └── textures/           # 3D textures and assets
```

## 🎨 Design System

### Colors
- **Nomad Palette**: Custom color scheme with dark theme
- **Primary**: `#667eea` (Blue)
- **Background**: `#0f172a` (Dark)
- **Text**: `#f1f5f9` (Light)

### Typography
- **Headings**: Inter (Bold)
- **Body**: Inter (Regular)
- **Code**: JetBrains Mono

### Components
- **Glass Effect**: Backdrop blur with transparency
- **Nomad Gradient**: Purple to blue gradient
- **Glow Effects**: Subtle lighting for interactive elements

## 🎬 Features

### Homepage (/)
- Fullscreen video intro with Veo integration
- Smooth fade transition to 3D Builder's Core
- Interactive 3D scene with click-to-enter workshop

### Workshop (/workshop)
- Responsive grid of tool tiles
- Hover animations and effects
- Smooth scroll-triggered reveals

### Tool Detail Pages (/tool/:slug)
- Immersive hero sections
- Structured content: What It Does, What Sparked It, Demo/Code/Clone links
- Personal reflections and insights

### About Page (/about)
- Scroll-based parallax effects
- Poetic manifesto sections
- Philosophical exploration of tool-building

## 🧪 Development Roadmap

### Week 1 ✅
- [x] Set up Vite + Tailwind + Routing
- [x] Add video intro component
- [x] Create 3D portal scene

### Week 2
- [ ] Integrate real Veo video
- [ ] Enhance 3D Builder's Core
- [ ] Implement smooth transitions

### Week 3
- [ ] Build real tool data structure
- [ ] Create actual tool implementations
- [ ] Add more interactive features

### Week 4
- [ ] Polish animations and effects
- [ ] Add audio/ambient features
- [ ] Optimize performance

## 🎯 Core Philosophy

### Why Small Tools?
In a world obsessed with scale, we find meaning in the intimate. Small tools solve specific problems. They don't try to be everything to everyone. They do one thing well, and they do it beautifully.

### What's Worth Building Now?
Tools that amplify human creativity, not replace it. Systems that make complex things simple, not simple things complex. Interfaces that feel like extensions of thought, not obstacles to it.

### Open Source & Unfinished
Because perfection is boring. Because the best ideas come from collaboration and iteration. Because tools should evolve with the people who use them.

## 🤝 Contributing

This is a personal creative laboratory, but contributions are welcome! Feel free to:

- Suggest new tools or features
- Improve existing components
- Add to the philosophy and manifesto
- Create your own tool implementations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ and ☕ by a digital nomad who believes the best way to understand technology is to create it.* 