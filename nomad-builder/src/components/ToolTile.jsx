import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ToolTile = ({ tool }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tool/${tool.slug}`)
  }

  return (
    <motion.div
      className="relative group cursor-pointer perspective-1000"
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-xl glass preserve-3d">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-nomad-600 to-nomad-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.1),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative p-6 h-64 flex flex-col justify-between">
          {/* Icon/Shape */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full nomad-gradient flex items-center justify-center text-white text-2xl font-bold">
              {tool.icon || '🔧'}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-nomad-100 mb-2 text-center">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="text-nomad-300 text-sm text-center leading-relaxed">
            {tool.description}
          </p>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-nomad-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="text-center">
              <p className="text-nomad-100 font-medium mb-2">View Details</p>
              <div className="w-8 h-0.5 bg-nomad-400 mx-auto"></div>
            </div>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl nomad-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
    </motion.div>
  )
}

export default ToolTile 