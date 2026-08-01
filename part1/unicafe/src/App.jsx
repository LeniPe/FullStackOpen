import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const percentagePositive = () => {
    return props.good / total * 100
  }

  const averageScore = () => {
    return (props.good - props.bad) / total
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="total" value={total} />
        <StatisticsLine text="Feedback score" value={averageScore()} />
        <StatisticsLine text="Percentage of positive feedback" value={percentagePositive() + "%"} />
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return (<tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1> give feedback </h1>
      <div>
        <Button text="good" onClick={handleGood} />
        <Button text="neutral" onClick={handleNeutral} />
        <Button text="bad" onClick={handleBad} />

      </div>
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>)
}

export default App