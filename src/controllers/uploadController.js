const imageToolkit = require('../utils/imageToolkit');

const upload = async (req, res, next) => {
    const image = req.file;
    if (!image) {
        return res.status(400).json({ success: false, status: 400, message: 'Invalid image' });
    }

    try {
        const imageResult = await imageToolkit.upload(image.path);
        if (!imageResult) {
            return res
                .status(500)
                .json({ success: false, status: 500, message: 'Internal server error' });
        }
        return res.status(200).json({
            success: true,
            image: { url: imageResult.secure_url, publicId: imageResult.public_id },
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { upload };
