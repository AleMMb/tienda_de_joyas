
const reporteConsultaQUERY = (req, res, next) => {
  const parametros = req.query
  const url = req.url
  console.log(`
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}
  con los parámetros:
  `, parametros)

  next()
}


const reporteConsultaPARAMS = (req, res, next) => {
  const parametros = req.params
  const url = req.url
  console.log(`
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}
  con los parámetros:
  `, parametros)


  next()
}


module.exports = { reporteConsultaQUERY,  reporteConsultaPARAMS }
