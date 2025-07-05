import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const About = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-nomad-900">
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
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-nomad-800 to-nomad-900"
          style={{ y }}
        />
        
        <ScrollReveal>
          <div className="relative text-center z-10 max-w-4xl mx-auto px-6">
            <h1 className="text-6xl font-bold text-nomad-100 mb-8">
              Tools from the road.
            </h1>
            <p className="text-2xl text-nomad-300 leading-relaxed">
              Shaped by experience. Built with AI. Shared to make sense of it all.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Content Sections */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-32">
        
        {/* Why Small Tools */}
        <ScrollReveal>
          <section>
            <h2 className="text-4xl font-bold text-nomad-100 mb-8">
              Why small tools?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-nomad-300 leading-relaxed">
                In a world obsessed with scale, I find meaning in the intimate. 
                Small tools solve specific problems. They don't try to be everything 
                to everyone. They do one thing well, and they do it beautifully.
              </p>
              <p className="text-xl text-nomad-300 leading-relaxed mt-6">
                Each tool in this workshop started as a personal need. A frustration 
                with existing solutions. A moment of "what if?" that couldn't be ignored.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* What's Worth Building */}
        <ScrollReveal>
          <section>
            <h2 className="text-4xl font-bold text-nomad-100 mb-8">
              What's worth building now?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-nomad-300 leading-relaxed">
                Tools that amplify human creativity, not replace it. Systems that 
                make complex things simple, not simple things complex. Interfaces 
                that feel like extensions of thought, not obstacles to it.
              </p>
              <p className="text-xl text-nomad-300 leading-relaxed mt-6">
                In the age of AI, the most valuable tools are those that help us 
                think better, create more freely, and connect more meaningfully.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Where Meaning Comes From */}
        <ScrollReveal>
          <section>
            <h2 className="text-4xl font-bold text-nomad-100 mb-8">
              Where does meaning come from in a post-scarcity world?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-nomad-300 leading-relaxed">
                Not from building the biggest platform or serving the most users. 
                Meaning comes from solving real problems for real people. From 
                creating tools that make someone's life a little bit better, a 
                little bit easier, a little bit more beautiful.
              </p>
              <p className="text-xl text-nomad-300 leading-relaxed mt-6">
                It comes from the conversations sparked by open-source code. From 
                the unexpected ways people use and modify your tools. From the 
                knowledge that something you built is helping someone else build 
                something meaningful.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Why Open Source */}
        <ScrollReveal>
          <section>
            <h2 className="text-4xl font-bold text-nomad-100 mb-8">
              Why keep it open-source, weird, and unfinished?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-nomad-300 leading-relaxed">
                Because perfection is boring. Because the best ideas come from 
                collaboration and iteration. Because tools should evolve with the 
                people who use them.
              </p>
              <p className="text-xl text-nomad-300 leading-relaxed mt-6">
                Open-source isn't just about code—it's about sharing the process, 
                the thinking, the mistakes. It's about building in public, learning 
                in public, growing in public.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Who is the Nomad Builder */}
        <ScrollReveal>
          <section>
            <h2 className="text-4xl font-bold text-nomad-100 mb-8">
              Who is the Nomad Builder?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-nomad-300 leading-relaxed">
                A digital nomad who builds tools instead of just using them. 
                Someone who believes that the best way to understand technology 
                is to create it. A collector of experiences, ideas, and insights 
                from years of global travel.
              </p>
              <p className="text-xl text-nomad-300 leading-relaxed mt-6">
                This isn't a portfolio. It's not a startup. It's a creative 
                laboratory for building meaning through technology—one small 
                system at a time.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal>
          <section className="text-center py-20">
            <h2 className="text-3xl font-bold text-nomad-100 mb-6">
              Ready to explore?
            </h2>
            <p className="text-xl text-nomad-300 mb-8">
              Dive into the workshop and see what's being built.
            </p>
            <Link
              to="/workshop"
              className="inline-flex items-center px-8 py-4 bg-nomad-600 hover:bg-nomad-500 text-white rounded-lg transition-colors"
            >
              Enter the Workshop
            </Link>
          </section>
        </ScrollReveal>
      </main>
    </div>
  )
}

export default About 