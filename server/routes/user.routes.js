module.exports = (app) => {
  const offre = require("../controllers/offre.controller.js");
  const candidat = require("../controllers/candidat.controller");
  const multer = require("multer");
  const email = require("../controllers/email.js");
  const quiz= require("../controllers/quiz.controller");


  var router = require("express").Router();

  // Retrieve all offers
  router.get("/offres", offre.findAll);

  //postuler
  const storage = candidat.storage;
  const fileFilter = candidat.fileFilter;


  let upload = multer({storage, fileFilter });
  router.post("/offres/:id/postuler", upload.single("photo"), candidat.postuler);
  router.post("/quizs/:id", email.sendQuiz);
  router.post("/submitResult", quiz.submitQuiz);
  router.post("/quizs/:id/takeQuiz", quiz.takeQuiz);

  router.post("/contactUs", email.contactUs);




  app.use("/api", router);
};