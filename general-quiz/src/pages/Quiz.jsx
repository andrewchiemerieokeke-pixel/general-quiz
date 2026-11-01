import { useLocation } from 'react-router-dom'

function Quiz() {
  const { state } = useLocation()

  return (
    <div>
      <h1>Quiz</h1>
      <p>Questions will appear here.</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default Quiz