const express = require('express')
const apiRouter = require('./server')
const app = express()
const port = 3000

app.use(express.json())
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.listen(port, (req, res) => {
  console.log(`escuchando en el puerto ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hola mundo desde ruta raíz.')
})


apiRouter(app)

