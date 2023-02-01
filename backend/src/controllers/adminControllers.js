const { verify, hash, argon2id } = require("argon2");
const { generateToken } = require("../services/jwt");
const models = require("../models");

const postAdmin = (req, res) => {
  const { pwd } = req.body;

  const hashingOptions = {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  hash(pwd, hashingOptions).then((hashedPassword) => {
    const admin = {
      ...req.body,
      hashedPassword,
    };
    models.admin
      .insert(admin)
      .then(() => {
        res.status(201).json({ success: "Admin saved" });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

const getAllAdmins = (req, res) => {
  models.admin
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAdminByID = (req, res) => {
  models.admin
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

const putAdmin = (req, res) => {
  const { pwd } = req.body;

  const hashingOptions = {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  hash(pwd, hashingOptions).then((hashedPassword) => {
    const admin = {
      ...req.body,
      hashedPassword,
    };

    admin.id = parseInt(req.params.id, 10);
    models.admin
      .update(admin)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(204).json({ success: "Admin updated" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

const deleteAdmin = (req, res) => {
  models.admin
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ success: "Admin deleted" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const loginAdmin = async (req, res) => {
  const { email, pwd } = req.body;
  models.admin
    .findByEmail(email)
    .then(([[admin]]) => {
      if (!admin) {
        return res.status(403).json({ error: "admin not found" });
      }
      // vérifier le MDP
      verify(admin.pwd, pwd)
        .then((match) => {
          if (match) {
            // 3 je retourne mon token//
            const token = generateToken({
              id: admin.id,
            });
            return res
              .cookie("token", token, { httpOnly: true, secure: false })
              .status(200)
              .json({ token, sucess: "admin logged" });
          }
          return res.status(403).json({ error: "password incorrect" });
        })
        .catch((error) => {
          console.error(error);
        });
      return false;
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  postAdmin,
  deleteAdmin,
  putAdmin,
  getAllAdmins,
  getAdminByID,
  loginAdmin,
};
