const express = require('express')
const apiRouter = require('./server')
const app = express()


/*
Maty estoy usando un router para agregar a mi API /api/v1 en la url, que creo es una buena práctica?? :P
te envio las url's de consulta del desafío y una extra para obtener una joya por id, la limité solo a los id de la base de datos inicial.
(para que no tengas de escribir más)

http://localhost:3000/api/v1/joyas?limits=3&page=2&order_by=stock_ASC
http://localhost:3000/api/v1/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
http://localhost:3000/api/v1/joyas/5

*/

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

