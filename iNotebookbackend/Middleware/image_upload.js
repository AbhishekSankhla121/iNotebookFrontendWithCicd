const multer = require("multer");
const { v4 } = require('uuid');

let upload;
try {

    const imgConfig = multer.diskStorage(
        {
            destination: (req, file, callback) => {
                callback(null, "./temp");
            },
            filename: (req, file, callback) => {
                callback(null, v4() + Date.now() + file.originalname);
            }
        }
    )

    const istype = async (req, file, callback) => {
        if (file.mimetype.startsWith('image')) {
            callback(null, true);
        }
        else {
            callback(new error("Only image is allowed"))
        }
    }
    upload = multer({ storage: imgConfig, fileFilter: istype });
} catch (error) {
    console.log("Error in image upload middleware:" + error)
}




module.exports = upload