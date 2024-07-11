const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/:id', customerController.readOne);
router.get('/', customerController.read);
router.post('/login', customerController.login);
router.post('/change-password', customerController.changePassword);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.destroy);

// Thêm các route mới cho sản phẩm yêu thích
router.get('/:id/favorites', customerController.getFavorites);
router.post('/:id/add-to-favorites/:productId', customerController.addToFavorites);
router.post('/:id/remove-from-favorites/:productId', customerController.removeFromFavorites);

module.exports = router;
