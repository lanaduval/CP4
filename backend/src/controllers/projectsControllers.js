const models = require("../models");

const postProjects = (req, res) => {
  const { projects, img } = req.body;
  models.projects
    .insert(projects, img)
    .then(() => {
      res.status(201).json({ success: "Project saved" });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getAllProjects = (req, res) => {
  models.projects
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getProjectsByID = (req, res) => {
  models.projects
    .getProjectsByID(req.params.id)
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

const putProjects = (req, res) => {
  const projects = req.body;

  projects.id = parseInt(req.params.id, 10);

  models.projects
    .update(projects)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ success: "Project updated" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteProjects = (req, res) => {
  models.projects
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ success: "Project deleted" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getProjectsAndPicturesByProjectsID = (req, res) => {
  const { id } = req.params;
  models.projects
    .getProjectsAndPicturesByProjectsID(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getAllProjectsAndPictures = (req, res) => {
  models.projects
    .getAllProjectsAndPictures()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  postProjects,
  getAllProjects,
  getProjectsByID,
  putProjects,
  deleteProjects,
  getProjectsAndPicturesByProjectsID,
  getAllProjectsAndPictures,
};
