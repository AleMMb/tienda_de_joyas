const express = require('express')
const joyasService = require('../services/servicesJoyas')
const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const queryStrings = req.query
  const joyas = await joyasService.getJoyas(queryStrings)
  var HATEOAS = await joyasService.formatHATEOAS(joyas)
  res.json(HATEOAS)
  console.log("consulta realizada con exito")
  } catch (error) {
   console.log(error)
  }
})


router.get('/:id', async (req, res) => {
  await joyasService.getOneJoya(req, res)
})


module.exports = router
