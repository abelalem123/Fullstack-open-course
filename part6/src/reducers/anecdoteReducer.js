import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice=createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    changeVote(state,action){
      const id=action.payload.id
      const newState=state.map(note=>note.id!==id?note:action.payload)
      return newState.sort((a,b)=>b.votes-a.votes)
    },
    pushAnecdotes(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload.sort((a,b)=>b.votes-a.votes)
    }
  }
})

export const{changeVote,setAnecdotes,pushAnecdotes}=anecdoteSlice.actions

export const initializeAnecdotes=()=>{
  return async dispach=>{
    const anecdotes=await anecdoteService.getAll()
    dispach(setAnecdotes(anecdotes))
  }
}
export const createAnecdotes=(content)=>{
  return async dispatch=>{
    const anecdotes=await anecdoteService.createAnecdotes(content)
dispatch(pushAnecdotes(anecdotes))
  }
}
export const changeVotes=(anecdote)=>{
  return async dispach=>{
    const id=anecdote.id
    const newObject={...anecdote,votes:anecdote.votes+1}
    const newAnecdotes=await anecdoteService.updateVotes(id,newObject)
    dispach(changeVote(newAnecdotes))
  }
}
export default anecdoteSlice.reducer