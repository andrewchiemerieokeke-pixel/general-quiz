import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

function Home() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState(10)

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/quiz', { state: { difficulty, amount } })
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: '500px' }}>
      <Card.Body>
        <Card.Title as="h1" className="h3 mb-3">Start a Quiz</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="difficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="amount">
            <Form.Label>Number of questions</Form.Label>
            <Form.Select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Start Quiz
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Home