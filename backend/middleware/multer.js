import multer from 'multer';
// import path from 'node:path';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/');
    },

    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;