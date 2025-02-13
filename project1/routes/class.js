const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
router.get('/', classController.getAll);
router.get('/:id', classController.getSingle);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
module.exports = router;
