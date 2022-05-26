const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const username = req.body.username;
  const password= req.body.password;
const hashedPassword=bcrypt.hashSync(password)
  // Create an offer
  const user = new User({
    username,
    password:hashedPassword,
    
  });
  // Save offer in the database
  user
    .save(user)
    .then((data) => {
      res.send({
        message: "admin added",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding admin.",
      });
    });
};
