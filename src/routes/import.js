const express = require('express');
const router = express.Router();
const importController = require('../controllers/importController');

router.get('/:id', importController.readOne);
router.get('/', importController.read);
router.post('/', importController.create);
router.delete('/:id', importController.destroy);

module.exports = router;
