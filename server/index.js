const express = require('express')
const joyasRouter = require('../routes/joyas')



function apiRouter(app){
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/joyas', joyasRouter)
}


module.exports = apiRouter
