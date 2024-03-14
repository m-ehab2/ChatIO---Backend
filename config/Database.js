const mongoose = require('mongoose');

const db = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log('DB Connected Successfully'))
    .catch((err) => console.log(err));
};
module.exports=db