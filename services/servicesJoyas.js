const pool = require('../database/conexion')
const format = require('pg-format');


const formatHATEOAS = (joyas) => {

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



const getJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
  try {
    const [campo, direccion] = order_by.split('_')
    const offset = (page - 1) * limits
    let formatoConsulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', campo, direccion, limits, offset)
    const { rows: joyas } = await pool.query(formatoConsulta)
    return joyas
  } catch (error) {
    console.log(error)
  }
}


const obtenerJoyasFiltro = async ({ precio_max, precio_min, categoria, metal }) => {
  try {
    let filtros = []
    values = []

    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor)
      const { length } = filtros
      filtros.push(`${campo} ${comparador} $${length + 1}`)
    }

    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)
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






const getOneJoya = async (req, res) => {
  try {
    const { id } = req.params
    let consulta = 'SELECT * FROM inventario WHERE id = $1'
    const { rows: joyas } = await pool.query(consulta, [id])
    res.json(joyas)
  } catch (error) {
    console.log
  }
}


module.exports = { formatHATEOAS, getJoyas, getOneJoya, obtenerJoyasFiltro }
