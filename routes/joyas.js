const express = require('express')
const joyasService = require('../services/servicesJoyas')
const reportes = require('../middleware/report.handler')
const router = express.Router()


router.get('/', reportes.reporteConsultaQUERY, async (req, res) => {
  try {
    const queryStrings = req.query
    const joyas = await joyasService.getJoyas(queryStrings)
    var HATEOAS = await joyasService.formatHATEOAS(joyas)
    res.json(HATEOAS)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/filtros', reportes.reporteConsultaQUERY, async (req, res) => {
  try {
    const queryStrings = req.query
    const joyas = await joyasService.obtenerJoyasFiltro(queryStrings)
    res.json(joyas)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.get('/:id', reportes.reporteConsultaPARAMS, async (req, res) => {
  try {
    await joyasService.getOneJoya(req, res)
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = router
