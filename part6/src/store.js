import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import norificationReducer from './reducers/norificationReducer'
import filterReducer from './reducers/filterReducer'
const store=configureStore({
    reducer:{
        anecdotes:anecdoteReducer,
        notification:norificationReducer,
        filter:filterReducer
    }
})

export default store