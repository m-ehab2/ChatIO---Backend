const multer = require('multer');
const fs = require('fs');

if (!fs.existsSync('./media')) {
  fs.mkdirSync('./media');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '.') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')||
    file.mimetype.startsWith('audio/')) {
    cb(null, true); 
  } else {
    cb(new Error('File type not supported. Only images and videos are allowed.'), false); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
