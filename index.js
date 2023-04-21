const express = require('express')
const apiRouter = require('./server')
const app = express()


require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.json())
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.listen(port, (req, res) => {
  console.log(`escuchando en el puerto ${port}`)
})


apiRouter(app)

