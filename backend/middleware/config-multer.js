/** multer parses incoming data bodies
 * 
 */
const multer = require('multer');

const multerApiStorage = require('multer-gridfs-storage');
/**
 * 
 */

const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

// Creation of the image file
const storage = new multerApiStorage({
    url: process.env.DB_URL,

    filename: (request, file, callback) => {
        const name = file.originalName.split(" ").join("_");
        const extension = MIME_TYPE[file.mimetype];

        callback(null, name + Date.now() +"." + extension);
    }
});

module.exports = multer({storage}).single();