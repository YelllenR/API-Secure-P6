/** multer parses incoming data bodies
 * 
 */
const multer = require('multer');


/** Format of the image
 *  According to the format uploaded, it converts it to the standard values
 */
const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

/** Creation of a storage for the images 
 * 1. With the function multer.diskStorage, to give the destination of the file.
 * here it will be stored to the disk, using callback to execute the function. 
 * 
 * 2. Filename to format the name of the image in order to have a standard
 * Using mime type to have a standard format 
 * 
 * @param {request file callback} 
 * 
 * @return {function callback} for execution of the given code 
 * 
 */
const Storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'images');
    },
    filename: (request, file, callback) => {
        const imgName = file.originalname;
        const extentionType = MIME_TYPE[file.mimetype];

        callback(null, Date.now() + imgName )
    }
});

const upload = multer({ storage: Storage })

// Exporting the multer/ storage function and single to have a single image file. 
module.exports = upload.single('image');


