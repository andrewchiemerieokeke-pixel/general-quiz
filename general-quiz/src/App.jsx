import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Container>
    </>
  )
}

export default App