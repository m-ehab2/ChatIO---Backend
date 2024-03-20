const multer = require('multer');
const fs = require('fs');
const BadRequest = require('../errors/BadRequest');

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

const multerFilter = (req, file, cb) => {
    console.log("file.mimetype ",file.mimetype)
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    console.log("file.mimetype ",file.mimetype)
      
    cb(null, true);
  } else {
    cb(
      new BadRequest('File type not supported. Only image is allowed.', 400),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

module.exports = upload;