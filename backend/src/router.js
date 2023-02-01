const express = require("express");
const multer = require("multer");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// admin ROADS

const adminControllers = require("./controllers/adminControllers");

// PUBLIQUES ROADS
router.post("/login", adminControllers.loginAdmin);

// PRIVATE ROADS
router.get("/admins", adminControllers.getAllAdmins);
router.get("/admins/:id", adminControllers.getAdminByID);
router.post("/admins", adminControllers.postAdmin);
router.put("/admins/:id", adminControllers.putAdmin);
router.delete("/admins/:id", adminControllers.deleteAdmin);

// projects ROADS
const projectsControllers = require("./controllers/projectsControllers");

router.post("/projects", projectsControllers.postProjects);
router.get("/projects", projectsControllers.getAllProjects);
router.get("/projects/:id", projectsControllers.getProjectsByID);
router.put("/projects/:id", projectsControllers.putProjects);
router.delete("/projects/:id", projectsControllers.deleteProjects);

// PROJECTS + PICTURES
router.get(
  "/projects-picture/:id",
  projectsControllers.getProjectsAndPicturesByProjectsID
);
router.get("/projects-picture", projectsControllers.getAllProjectsAndPictures);

// picture roads
const pictureControllers = require("./controllers/pictureControllers");

router.post("/pictures", pictureControllers.postPicture);
router.get("/pictures", pictureControllers.getAllPicture);
router.get("/pictures/:id", pictureControllers.getPictureByID);
router.put("/pictures/:id", pictureControllers.putPicture);
router.delete("/pictures/:id", pictureControllers.deletePicture);

// uploads
const multerControllers = require("./controllers/multerControllers");

const avatarDest = multer({ dest: "uploads/avatar/" });
const photosDest = multer({ dest: "uploads/photos/" });

router.post(
  "/admin-profil",
  avatarDest.single("avatar"),
  multerControllers.uploadAvatar
);
router.post(
  "/projects-picture",
  photosDest.single("photo"),
  multerControllers.uploadPicture
);

module.exports = router;
