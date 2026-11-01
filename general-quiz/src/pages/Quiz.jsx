import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Spinner, Alert, Button, Card, ProgressBar } from 'react-bootstrap'
import { decode } from 'he'


function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function Quiz() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const difficulty = state?.difficulty ?? ''
  const amount = state?.amount ?? 10

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    async function loadQuestions() {
      try {
        setLoading(true)
        setError(null)

        let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`
        if (difficulty) {
          url += `&difficulty=${difficulty}`
        }

        const response = await fetch(url)
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait 5 seconds and try again.')
        }
        if (!response.ok) {
          throw new Error('Could not reach the question server.')
        }

        const data = await response.json()
        if (data.response_code !== 0) {
          throw new Error('The server could not provide questions. Please try again.')
        }

        const cleaned = data.results.map((item) => {
          const correctAnswer = decode(item.correct_answer)
          const incorrectAnswers = item.incorrect_answers.map((a) => decode(a))
          return {
            question: decode(item.question),
            correctAnswer,
            answers: shuffle([correctAnswer, ...incorrectAnswers]),
            difficulty: item.difficulty,
          }
        })

        setQuestions(cleaned)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [amount, difficulty])

  function handleAnswer(answer) {
    if (selected !== null) return
    setSelected(answer)
    if (answer === questions[currentIndex].correctAnswer) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    setSelected(null)
    setCurrentIndex((i) => i + 1)
  }

  function handleFinish() {
  const attempt = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    score,
    total: questions.length,
    difficulty: difficulty || 'any',
  }

  let history = []
  try {
    history = JSON.parse(localStorage.getItem('quizHistory')) || []
  } catch {
    history = []
  }
  history.push(attempt)
  localStorage.setItem('quizHistory', JSON.stringify(history))

  navigate('/results', { state: attempt })
}

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
        <p>{error}</p>
        <Button as={Link} to="/" variant="outline-danger">Back to Home</Button>
      </Alert>
    )
  }

  const current = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  function getVariant(answer) {
    if (selected === null) return 'outline-primary'
    if (answer === current.correctAnswer) return 'success'
    if (answer === selected) return 'danger'
    return 'outline-secondary'
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: '700px' }}>
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <ProgressBar
          now={((currentIndex + 1) / questions.length) * 100}
          className="mb-4"
        />

        <Card.Title as="h2" className="h4 mb-4">{current.question}</Card.Title>

        <div className="d-grid gap-2">
          {current.answers.map((answer) => (
            <Button
              key={answer}
              variant={getVariant(answer)}
              onClick={() => handleAnswer(answer)}
              disabled={selected !== null}
            >
              {answer}
            </Button>
          ))}
        </div>

       
                {selected !== null && !isLast && (
          <Button className="mt-4" onClick={handleNext}>Next question</Button>
        )}
        {selected !== null && isLast && (
          <Button className="mt-4" variant="success" onClick={handleFinish}>
            See results
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Quiz