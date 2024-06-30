const express = require('express');
const router = express.Router();
const userCont = require('../controllers/userCont');

router.post('/', userCont.createPenerima);
router.get('/', userCont.getPenerima);
router.get('/:nik', userCont.getPenerimaByNik);
router.put('/:nik', userCont.updatePenerima);
router.delete('/:nik', userCont.deletePenerima);

module.exports = router; // Ensure the router is being exported correctly
