const express = require('express');
const router = express.Router();
const promotionProgramController = require('../controllers/promotionProgramController');

router.get('/:id', promotionProgramController.readOne);
router.get('/', promotionProgramController.read);
router.post('/', promotionProgramController.create);
router.put('/:id', promotionProgramController.update);
router.delete('/:id', promotionProgramController.destroy);

module.exports = router;
