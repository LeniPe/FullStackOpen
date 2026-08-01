import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (
  <div>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
  </div>
)

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
        <Button text="good" onClick={handleGood}/>
        <Button text="neutral" onClick={handleNeutral}/>
        <Button text="bad" onClick={handleBad}/>
        
      </div>
      <h1> statistics </h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>)
}

export default App