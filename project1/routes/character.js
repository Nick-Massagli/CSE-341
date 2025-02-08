const express = require('express');
const router = express.Router();
const characterController = require('../controllers/stats');
router.get('/', characterController.getAll);
router.get('/:id', characterController.getSingle);
router.post('/', characterController.createCharacter);
module.exports = router;
