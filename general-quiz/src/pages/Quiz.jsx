import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Spinner, Alert, Button } from 'react-bootstrap'
import { decode } from 'he'

function Quiz() {
  const { state } = useLocation()
  const difficulty = state?.difficulty ?? ''
  const amount = state?.amount ?? 10

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

        const cleaned = data.results.map((item) => ({
          question: decode(item.question),
          correctAnswer: decode(item.correct_answer),
          incorrectAnswers: item.incorrect_answers.map((a) => decode(a)),
          difficulty: item.difficulty,
        }))

        setQuestions(cleaned)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [amount, difficulty])

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

  return (
    <div>
      <h1>Quiz</h1>
      <p>Loaded {questions.length} questions.</p>
      <pre>{JSON.stringify(questions[0], null, 2)}</pre>
    </div>
  )
}

export default Quiz