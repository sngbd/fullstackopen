import { useState } from 'react'

const Statistics = ({props, text, suf}) => {
  return (
    <tr>
     <td>{text}</td>
     <td>{props} {suf}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100 / all)  
  
  if (all === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistics props={good} text='good' />
          <Statistics props={neutral} text='neutral' />
          <Statistics props={bad} text='bad' />
          <Statistics props={all} text='all' />
          <Statistics props={average} text='average' />
          <Statistics props={positive} text='positive' suf='%' />
        </tbody>
      </table>
    </div>
  )
}

export default App