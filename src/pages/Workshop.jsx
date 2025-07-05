import { motion } from 'framer-motion'
import ToolTile from '../components/ToolTile'
import ScrollReveal from '../components/ScrollReveal'
import { Link } from 'react-router-dom'

// Mock tools data - replace with real data later
const mockTools = [
  {
    slug: 'mind-mapper',
    name: 'Mind Mapper',
    description: 'Visual thinking tool for connecting ideas across digital spaces',
    icon: '🧠',
  },
  {
    slug: 'code-synthesizer',
    name: 'Code Synthesizer',
    description: 'AI-powered code generation from natural language descriptions',
    icon: '⚡',
  },
  {
    slug: 'design-system-builder',
    name: 'Design System Builder',
    description: 'Automated creation of consistent design tokens and components',
    icon: '🎨',
  },
  {
    slug: 'data-visualizer',
    name: 'Data Visualizer',
    description: 'Interactive charts and graphs for complex datasets',
    icon: '📊',
  },
  {
    slug: 'content-generator',
    name: 'Content Generator',
    description: 'AI-driven content creation for blogs and documentation',
    icon: '✍️',
  },
  {
    slug: 'workflow-automator',
    name: 'Workflow Automator',
    description: 'Visual programming for repetitive tasks and processes',
    icon: '⚙️',
  },
]

const Workshop = () => {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-nomad-100 mb-6">
              The Workshop
            </h1>
            <p className="text-xl text-nomad-300 max-w-3xl mx-auto leading-relaxed">
              A collection of tools and systems — each one a small experiment in 
              making technology more human, more meaningful, more alive.
            </p>
          </div>
        </ScrollReveal>

        {/* Tools Grid */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTools.map((tool, index) => (
              <ScrollReveal key={tool.slug} delay={0.1 * index}>
                <ToolTile tool={tool} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.5}>
          <div className="text-center mt-20 pt-12 border-t border-nomad-700/50">
            <p className="text-nomad-400 text-sm">
              More tools coming soon. Each one shaped by experience, 
              built with AI, shared to make sense of it all.
            </p>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}

export default Workshop 