

const errorID ={
  code: 400,
  error: 'Bad Request',
  mensaje: 'id no encontrada'
}

const errorPrecio = {
  code: 400,
  error: "Bad Request",
  mensaje: `El precio debe ser un valor numérico`
}

const errorCategoria = {
  code: 400,
  error: "Bad Request",
  mensaje: "la categoría ingresada no existe"
}

const metalError = {
  code: 400,
  error: "Bad Request",
  mensaje: "El metal ingresado no es valido"
}

const errorfiltro = {
  code: 400,
  error: "Bad Request",
  mensaje: "La ruta /filtros esta esperando filtros"
}

const errorLimite = {
  code: 400,
  error: "Bad Request",
  mensaje: "El Numero de paginas no es numerico",
}

module.exports = {
  errorID,
  errorPrecio,
  errorCategoria,
  metalError,
  errorfiltro,
  errorLimite
}
