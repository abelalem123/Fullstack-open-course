import { useState } from 'react'
const Button = (props) => {

  return (
    <button onClick={props.onClick} > {props.text}</button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0));
  const [maxIndex,setMax]=useState(0);
  const [maximumValue,setMaxval]=useState(0);
  const min = 0;
  const max = 6;
  const rand = Math.floor(Math.random() * (max - min)) + 1
  return (
    <div>
      <div><h1>Anecdote of the day</h1></div>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <Button onClick={() => {
          const copy = { ...votes }
          copy[selected] += 1
        if(maximumValue<copy[selected]){
         setMaxval(copy[selected])
         setMax(selected)
        }
        
          setVote(copy)
        }}
          text={'vote'}
        />
        <Button onClick={() => setSelected(rand)} text={'next anecdote'} />

      </div>
      <div><h1>Anecdote with the most votes</h1></div>
    <div> {anecdotes[maxIndex]}</div>
    </div>
  )
}

export default App