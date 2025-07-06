import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Workshop from './pages/Workshop'
import ToolDetail from './pages/ToolDetail'
import About from './pages/About'
import Pool from './pages/Pool'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<About />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/tool/:slug" element={<ToolDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/pool" element={<Pool />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
