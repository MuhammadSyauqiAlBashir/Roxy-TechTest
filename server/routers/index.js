const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.get('/master', Controller.getBarang)
router.post('/master', Controller.addBarang)
router.put('/master/:id', Controller.updateBarang)
router.delete('/master/:id', Controller.deleteBarang)
router.get('/master/:id', Controller.getBarangById)



module.exports = router