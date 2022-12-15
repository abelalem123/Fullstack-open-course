const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger=require('./utils/logger')
const config=require('./utils/config')
const blogRouters=require('./controllers/blog')
const usersRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const middleware=require('./utils/middleware')


logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(()=>{
  logger.info('connected to MongoDB')
}).catch((error)=>{
logger.error('error connecting', error.message)
})
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouters)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports= app