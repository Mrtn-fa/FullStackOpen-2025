import { useState } from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, avg, positive }) => {
  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={good} />
          <StatisticLine name='neutral' value={neutral} />
          <StatisticLine name='bad' value={bad} />
          <StatisticLine name='all' value={total} />
          <StatisticLine name='average' value={avg} />
          <StatisticLine name='positive' value={positive + ' %'} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const positive = 100 * good / total;

  const setFeedback = (stat, setStat) => {
    return setStat(stat + 1)
  }

  const addToGood = () => {
    return setFeedback(good, setGood);
  }

  const addToNeutral = () => {
    return setFeedback(neutral, setNeutral);
  }

  const addToBad = () => {
    return setFeedback(bad, setBad);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button name="good" onClick={addToGood} />
      <Button name="neutral" onClick={addToNeutral} />
      <Button name="bad" onClick={addToBad} />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive} />
    </div>
  )
}

export default App