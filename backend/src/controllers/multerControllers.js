const fs = require("fs");

const uploadAvatar = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `uploads/avatar/${filename}`,
    `uploads/avatar/${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
};

const uploadPicture = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `uploads/photos/${filename}`,
    `uploads/photos/${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("Files uploaded");
    }
  );
};

module.exports = {
  uploadAvatar,
  uploadPicture,
};
