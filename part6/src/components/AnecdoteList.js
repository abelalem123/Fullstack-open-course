import { useSelector, useDispatch, connect } from 'react-redux'
import { changeVotes, } from '../reducers/anecdoteReducer'
import { notifyApp } from '../reducers/norificationReducer'
const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({ filter, anecdotes }) => {
  //   if (filter === '') {
  //     return anecdotes
  //   }

  //   return anecdotes.filter(note => note.content.toUpperCase().includes(filter.toUpperCase()))
  // })

  const vote = (anecdote, content) => {
    props.changeVotes(anecdote)
    props.notifyApp(`you voted ${content}`, 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote, anecdote.content)
            }>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  if(state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  }
return {
  anecdotes: state.anecdotes.filter(note => note.content.toUpperCase().includes(state.filter.toUpperCase()))
}
}

const mapDispatchToProps = {
  changeVotes,notifyApp
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)