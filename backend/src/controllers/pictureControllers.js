/* eslint-disable camelcase */
const models = require("../models");

const postPicture = (req, res) => {
  const { img, legende, projects_id, admin_id } = req.body;
  models.picture
    .insert(img, legende, projects_id, admin_id)
    .then(() => {
      res.status(201).json({ success: "Picture saved" });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getAllPicture = (req, res) => {
  models.picture
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPictureByID = (req, res) => {
  models.picture
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const putPicture = (req, res) => {
  const picture = req.body;

  picture.id = parseInt(req.params.id, 10);

  models.picture
    .update(picture)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ success: "Picture updated" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deletePicture = (req, res) => {
  models.picture
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ success: "Picture deleted" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  postPicture,
  getAllPicture,
  getPictureByID,
  putPicture,
  deletePicture,
};
