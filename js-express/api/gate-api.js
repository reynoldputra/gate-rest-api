//Untuk routing
const express = require('express');
const gateController = require('../controllers/gate');
const router = express.Router();
router.get('/kartu', gateController.showAll); 
module.exports = router;