import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
)

const Statistics = (props) => {
  var all = props.good + props.neutral + props.bad
  if(all == 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
  <div>
    <StatisticLine text = "good" value={props.good}/>
    <StatisticLine text = "neutral" value={props.neutral}/>
    <StatisticLine text = "bad" value={props.bad}/>
    <StatisticLine text = "all" value={all}/>
    <StatisticLine text = "average" value={(props.good-props.bad)/(all)}/>
    <StatisticLine text = "positive" value={props.good/all*100 + ' %'}/>
  </div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good +1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setBad(bad +1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App