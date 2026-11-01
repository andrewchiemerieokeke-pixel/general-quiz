import { useLocation, Link } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'

function Results() {
  const { state } = useLocation()

  return (
    <div className="mx-auto" style={{ maxWidth: '700px' }}>
      {state ? (
        <Card className="text-center mb-4">
          <Card.Body>
            <Card.Title as="h1" className="h3">Quiz complete!</Card.Title>
            <p className="display-4 my-3">{state.score} / {state.total}</p>
            <p>Difficulty: {state.difficulty}</p>
            <Button as={Link} to="/" variant="primary">Play again</Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">
          No quiz finished yet. <Link to="/">Start one!</Link>
        </Alert>
      )}
    </div>
  )
}

export default Results