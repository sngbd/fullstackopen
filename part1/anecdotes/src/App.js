import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  var ary = new Uint8Array(anecdotes.length); 

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(ary)

  const handleSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }
  
  const max = Math.max(...votes)
  const index = votes.indexOf(max)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]}</p>
      <button onClick={handleVote}>votes</button>
      <button onClick={handleSelect}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]}</p>
    </div>
  )
}

export default App