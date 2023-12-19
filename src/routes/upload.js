const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});
const uploadController = require('../controllers/uploadController');

router.post('/', multer({ storage }).single('image'), uploadController.upload);

module.exports = router;
