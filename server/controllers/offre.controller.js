const db = require("../models");
const Offre = db.offre;
// Create and Save a new Tutorial
exports.create = (req, res) => {
 
  // Create an offer
  const offre = new Offre({
    intituleDuPoste: req.body.intituleDuPoste,
    description: req.body.description,
    experienceRequise: req.body.experienceRequise,
    TypeContrat: req.body.TypeContrat,
    duréeContrat: req.body.duréeContrat,
    role: req.body.role,
    langages: req.body.langages,
    utils: req.body.utils,
  });
  // Save offer in the database
  offre
    .save(offre)
    .then((data) => {
      res.send( {
        message:"offer added",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the offer.",
      });
    });
};
// Retrieve all offers from the database.
exports.findAll = (req, res) => {
 
 const title = req.query.intituleDuPoste;
 var condition = title
   ? { intituleDuPoste: { $regex: new RegExp(intituleDuPoste), $options: "i" } }
   : {};
  Offre.find(condition)
    .then((data) => {
      res.send( data );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving offer.",
      });
    });
};;
// Find a single offer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Offre.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found offer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving offer with id=" + id });
    });
};
// Update an offer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Offre.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update offre with id=${id}. Maybe offer was not found!`,
        });
      } else res.send({ message: "offer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating offer with id=" + id,
      });
    });
};
// Delete a offer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Offre.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete offre with id=${id}. Maybe offre was not found!`,
        });
      } else {
        res.send({
          message: "offer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete offer with id=" + id,
      });
    });
};
// Delete all offers from the database.
exports.deleteAll = (req, res) => {
  Offre.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} offers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all offers.",
      });
    });
};
