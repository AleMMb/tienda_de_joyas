const pool = require('../database/conexion')
const format = require('pg-format')
const error = require('../middleware/error.handler')


const formatHATEOAS = (joyas) => {  //estructura la respuesta HATEOAS

  const results = joyas.map((j) => {
    return {
      name: j.nombre,
      href: `/api/v1/joyas/joya${j.id}`
    }
  })

  const stocks = joyas.map((e) => {
    return { stock: e.stock }
  })

  let suma = 0
  stocks.forEach(cantidad => {
    suma += cantidad.stock
  })

  const totalJoyas = joyas.length
  const totalStock = suma
  const HATEOAS = { totalJoyas, totalStock, results }
  return HATEOAS
}





const getJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {   // cosulta parametrizada
  if (limits <= 0 || isNaN(limits))
    throw error.errorLimite

  try {
    if (limits <= 0 || isNaN(limits))
      throw error.errorLimite
    const [campo, direccion] = order_by.split('_')
    const offset = (page - 1) * limits
    let formatoConsulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', campo, direccion, limits, offset)
    const { rows: joyas } = await pool.query(formatoConsulta)
    return joyas
  } catch (error) {
    console.log(error)
  }
}





const obtenerJoyasFiltro = async ({ precio_max, precio_min, categoria, metal }) => {  //consulta capaz de filtrar por queryString

  if (precio_max && isNaN(precio_max)) {
    throw error.errorPrecio
  }
  if (precio_min && isNaN(precio_min)) {
    throw error.errorPrecio
  }
  const categorias = ['aros', 'anillo', 'collar']
  if (categoria && !categorias.includes(categoria)) {
    throw error.errorCategoria
  }
  const metales = ['oro', 'plata']
  if (metal && !metales.includes(metal)) {
    throw error.metalError
  }

  try {
    let filtros = []
    values = []

    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor)
      const { length } = filtros
      filtros.push(`${campo} ${comparador} $${length + 1}`)
    }

    if ('$1') agregarFiltro('precio', '<=', precio_max)
    if ('$2') agregarFiltro('precio', '>=', precio_min)
    if ('$3') agregarFiltro('categoria', '=', categoria)
    if ('$4') agregarFiltro('metal', '=', metal)
    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ")
      consulta += ` WHERE ${filtros}`
    }
    const { rows: joyas } = await pool.query(consulta, values)
    return joyas
  } catch (error) {
    console.log(error)
  }
}






const getOneJoya = async (req, res) => {  // consulta para obtener una joya por parametro ID

  const { id } = req.params
  if (id <= 0 || isNaN(id) || id > 6)
    throw error.errorID

  try {
    let consulta = 'SELECT * FROM inventario WHERE id = $1'
    const { rows: joyas } = await pool.query(consulta, [id])
    res.json(joyas)
  } catch (error) {
    console.log(error)
  }
}


module.exports = { formatHATEOAS, getJoyas, getOneJoya, obtenerJoyasFiltro }
