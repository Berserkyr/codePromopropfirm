const express = require('express');
const router = express.Router();
const propfirmController = require('../controllers/propfirmController');

// Route pour créer une nouvelle entreprise de prop trading
router.post('/propfirmAdd', propfirmController.createPropFirm);

module.exports = router;
