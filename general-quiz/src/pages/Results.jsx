import { useLocation, Link } from 'react-router-dom'
import { Card, Button, Alert, Table } from 'react-bootstrap'

function Results() {
  const { state } = useLocation()
  let history = []
try {
  history = JSON.parse(localStorage.getItem('quizHistory')) || []
} catch {
  history = []
}
const recent = [...history].reverse()

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


      <h2 className="h4">Past attempts</h2>
{recent.length === 0 ? (
  <p>No attempts saved yet.</p>
) : (
  <Table striped responsive>
    <thead>
      <tr>
        <th>Date</th>
        <th>Difficulty</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {recent.map((a) => (
        <tr key={a.id}>
          <td>{a.date}</td>
          <td>{a.difficulty}</td>
          <td>{a.score} / {a.total}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)}
    </div>
  )
}

export default Results