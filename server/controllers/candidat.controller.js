const multer = require("multer");
const db = require("../models");
const User = db.candidat;
const { v4: uuidv4 } = require("uuid");
let path = require("path");


// postuler pour un offre

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

exports.fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

  exports.postuler = (req, res) => {
   var newProduct = req.body;
   
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
        message: err.message || "Some error occurred while retrieving candidat.",
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
      res.status(500).send({ message: "Error retrieving candidat with id=" + id });
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
      const _id = req.params.id

      const candidats = await User.find({ offres: _id });
      return res.status(200).json(candidats)
    } catch (error) {
      return res.status(500).json({ "error": error })
    }

}
