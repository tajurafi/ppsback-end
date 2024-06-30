const express = require('express');
const router = express.Router();
const itemCont = require('../controllers/itemCont');

router.get('/', itemCont.listBansos);
router.put('/approved/:id', itemCont.approval);
router.put('/rejected/:id', itemCont.rejection);
router.post('/', itemCont.insertBansos);
router.get('/:id', itemCont.detail)

module.exports = router;
