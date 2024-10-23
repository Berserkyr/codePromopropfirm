const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

router.get('/codeList', codeController.getCodes); 
router.post('/codeAdd', codeController.createCode); 
router.put('/codePromoUpdate/:id', codeController.updateCode); 
router.put('/codeUrlUpdate/:id', codeController.updateUrl); 

module.exports = router;