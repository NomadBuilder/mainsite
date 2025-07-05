import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

// Mock tool data - replace with real data later
const mockToolData = {
  'mind-mapper': {
    name: 'Mind Mapper',
    description: 'Visual thinking tool for connecting ideas across digital spaces',
    icon: '🧠',
    whatItDoes: 'A digital canvas for mapping thoughts, ideas, and connections. Drag and drop to create visual relationships between concepts, with AI-powered suggestions for new connections.',
    whatSparkedIt: '"I was sitting in a café in Tokyo, watching people draw diagrams on napkins. I realized we need better digital tools for thinking visually."',
    demo: 'https://mind-mapper-demo.vercel.app',
    code: 'https://github.com/nomad-builder/mind-mapper',
    clone: 'https://replit.com/@nomad-builder/mind-mapper',
    reflection: 'Sometimes the simplest tools are the most powerful. This started as a weekend project and became something I use daily. It reminds me that good software should feel like an extension of thought.',
    theme: 'blue',
  },
  'code-synthesizer': {
    name: 'Code Synthesizer',
    description: 'AI-powered code generation from natural language descriptions',
    icon: '⚡',
    whatItDoes: 'Describe what you want to build in plain English, and watch as AI generates working code. Supports multiple languages and frameworks with intelligent error handling.',
    whatSparkedIt: '"After writing the same boilerplate code for the hundredth time, I wondered: what if I could just describe what I want and have it appear?"',
    demo: 'https://code-synthesizer.vercel.app',
    code: 'https://github.com/nomad-builder/code-synthesizer',
    clone: 'https://codesandbox.io/s/code-synthesizer',
    reflection: 'This tool taught me that AI isn\'t replacing programmers—it\'s amplifying our ability to think at higher levels. The challenge isn\'t writing code anymore, it\'s describing intent clearly.',
    theme: 'purple',
  },
}

const ToolDetail = () => {
  const { slug } = useParams()
  const tool = mockToolData[slug]

  if (!tool) {
    return (
      <div className="min-h-screen bg-nomad-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-nomad-100 mb-4">Tool Not Found</h1>
          <p className="text-nomad-300 mb-8">This tool doesn't exist yet.</p>
          <Link
            to="/workshop"
            className="px-6 py-3 bg-nomad-600 hover:bg-nomad-500 text-white rounded-lg transition-colors"
          >
            Back to Workshop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nomad-900">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 glass backdrop-blur-lg border-b border-nomad-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-nomad-100">
              Nomad Builder
            </Link>
            <nav className="flex items-center space-x-8">
              <Link
                to="/workshop"
                className="text-nomad-300 hover:text-nomad-100 transition-colors"
              >
                Workshop
              </Link>
              <Link
                to="/about"
                className="text-nomad-300 hover:text-nomad-100 transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nomad-800 to-nomad-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.1),transparent_50%)]" />
        
        <ScrollReveal>
          <div className="relative text-center z-10">
            <div className="text-8xl mb-6">{tool.icon}</div>
            <h1 className="text-6xl font-bold text-nomad-100 mb-6">
              {tool.name}
            </h1>
            <p className="text-xl text-nomad-300 max-w-2xl mx-auto leading-relaxed">
              {tool.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-nomad-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-nomad-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        {/* What It Does */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-bold text-nomad-100 mb-6">🔍 What It Does</h2>
            <p className="text-lg text-nomad-300 leading-relaxed">
              {tool.whatItDoes}
            </p>
          </section>
        </ScrollReveal>

        {/* What Sparked It */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-bold text-nomad-100 mb-6">💡 What Sparked It</h2>
            <blockquote className="text-lg text-nomad-300 leading-relaxed italic border-l-4 border-nomad-500 pl-6">
              {tool.whatSparkedIt}
            </blockquote>
          </section>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-bold text-nomad-100 mb-6">🛠 Demo | Code | Clone</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={tool.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 glass rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-nomad-100 mb-2">Demo</h3>
                <p className="text-nomad-300 text-sm">Try it live</p>
              </a>
              <a
                href={tool.code}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 glass rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-nomad-100 mb-2">Code</h3>
                <p className="text-nomad-300 text-sm">View source</p>
              </a>
              <a
                href={tool.clone}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 glass rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-nomad-100 mb-2">Clone</h3>
                <p className="text-nomad-300 text-sm">Fork & modify</p>
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* Reflection */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-bold text-nomad-100 mb-6">🧠 Reflection</h2>
            <p className="text-lg text-nomad-300 leading-relaxed">
              {tool.reflection}
            </p>
          </section>
        </ScrollReveal>
      </main>

      {/* Back to Workshop */}
      <ScrollReveal>
        <div className="text-center py-20">
          <Link
            to="/workshop"
            className="inline-flex items-center px-8 py-4 bg-nomad-600 hover:bg-nomad-500 text-white rounded-lg transition-colors"
          >
            ← Back to Workshop
          </Link>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default ToolDetail 