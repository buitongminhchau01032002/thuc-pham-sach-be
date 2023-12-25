const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/:id', ratingController.readOne);
router.get('/', ratingController.read);
router.post('/', ratingController.create);
router.put('/:id', ratingController.update);
router.delete('/:id', ratingController.destroy);

module.exports = router;
