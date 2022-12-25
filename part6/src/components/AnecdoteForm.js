import {  connect, useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'
const AnecdoteForm=(props)=>{
  
    const createNew=async(event)=>{
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
       props.createAnecdotes(content)
      }
    return(
        <div>
              <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name='note'/></div>
        <button type='submit'>create</button>
      </form></div>
    )
}
const mapDispatchToProps={
  createAnecdotes
}
export default connect(null,mapDispatchToProps)(AnecdoteForm)