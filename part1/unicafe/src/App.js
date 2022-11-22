import { useState } from 'react'

const Button=(props)=>  <button onClick={props.onClick}>{props.text}</button>
 
const StatisticsLine=(props)=>{ 
  if(props.text==='postive'){
  return(
    <tr>
    <td>{props.text}</td>
   <td>{props.value} %</td>
 
</tr>
  )
}
else{
  return(
   
 <tr>
     <td>{props.text}</td>
    <td>{props.value}</td>
 </tr>
  )
}}
const Statistics=({good,bad,neutral})=>{
  const all=good+bad+neutral
  const postive=good*100/all;
  const average=(good-bad)/all
 
return(
  <div>
<table>
<tbody>
<StatisticsLine text={'good'} value={good}/>
 <StatisticsLine text={'neutral'} value={neutral}/>
 <StatisticsLine text={'bad'} value={bad}/>
 <StatisticsLine text={'all'} value={all}/>
 <StatisticsLine text={'average'} value={average}/>
 <StatisticsLine text={'postive'} value={postive}/>
</tbody>

 
</table>
 
  </div>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
if(good+bad+neutral===0){
  return(
    
   <div>
     <h1>give feedback</h1>
     <Button onClick={()=>setGood(good+1)} text={'good'}/>
        <Button onClick={()=>setNeutral(neutral+1)} text={'neutral'}/>
        <Button onClick={()=>setBad(bad+1)} text={'bad'}/>
     <h4>No feedback given</h4>
   </div>
  )
}

  
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={()=>setGood(good+1)} text={'good'}/>
        <Button onClick={()=>setNeutral(neutral+1)} text={'neutral'}/>
        <Button onClick={()=>setBad(bad+1)} text={'bad'}/>
        <h2>Statistics</h2>
        <Statistics good={good} bad={bad} neutral={neutral}/>
      </div>
    )
  
}

export default App