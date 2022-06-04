const multer = require("multer");
const db = require("../models");
const User = db.candidat;
let path = require("path");

// postuler pour un offre

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
const ext = file.mimetype.split("/")[1];
cb(null, `files-${Date.now()}.${ext}`);  },
});

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

exports.postuler = (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  console.log("success", req?.file);

  const photo = req.file.filename;

  const newUserData = {
    nom,
    prenom,
    email,
    photo,
  };

  const newUser = new User(newUserData);
  newUser.offres = req.params.id;

  newUser
    .save()
    .then(() => res.json("succes"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving candidat.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found candidat with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving candidat with id=" + id });
    });
};

// Delete a candidat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete candidat with id=${id}. Maybe candidat was not found!`,
        });
      } else {
        res.send({
          message: "candidat was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete candidat with id=" + id,
      });
    });
};

exports.getCandidatsByOffre = async (req, res) => {
  try {
    const _id = req.params.id;

    const candidats = await User.find({ offres: _id });
    return res.status(200).json(candidats);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.getCv = async (req, res) => {
  try {
    const file = await User.findById(req.params.id);
    res.set({
      "Content-Type": "application / pdf",
    });
    res.sendFile(path.join("C:/Users/NADA/Desktop/app/server/files", file.photo));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
};
