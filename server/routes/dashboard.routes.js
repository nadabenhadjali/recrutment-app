const offre = require("../controllers/offre.controller.js");
const quiz = require("../controllers/quiz.controller.js");
const question = require("../controllers/question.controller.js");
const candidat = require("../controllers/candidat.controller");
const email = require("../controllers/email");
const auth = require("../middlewares/auth");
const admin = require("../controllers/addAdmin");
const { requireSignin } = require("../middlewares/auth");

var router = require("express").Router();
router.post("/addAdmin",requireSignin, admin.create);
router.post("/login", auth.signin);
router.post("/signout", auth.signout);
router.get("/admin", requireSignin, auth.getAdmin);
// Create a new offre
router.post("/offres", offre.create);

// Retrieve all offers
router.get("/offres", offre.findAll);
// Retrieve a single offre with id
router.get("/offres/:id",  offre.findOne);
// Update an offre with id
router.patch("/offres/:id", offre.update);
// Delete an offre with id
router.delete("/offres/:id",  offre.delete);
// delete all offres
router.delete("/offres",  offre.deleteAll);

//quiz
// add question to quiz
router.post("/quizs/:id",  quiz.addQuestionToQuiz);
// get all quizs
router.get("/quizs", quiz.getAll);
//get Questions by Quiz id
router.get("/quizs/:id/questions", quiz.getQuizQuestions);


// create one quiz
router.post("/quizs",  quiz.add);
//get quiz by id
router.get("/quizs/:id",  quiz.getQuizById);
// delete quiz
router.delete("/quizs/:id",  quiz.deleteQuiz);
//send quiz link
router.post("/quizs/:id",  email.sendQuiz);
//get result
router.get("/result",  quiz.getResult);
// get quiz qustions
router.get("/quizs/:id/questions", quiz.getQuizQuestions);

//add question
router.post("/questions",question.createQst);
// get one quiz question
router.get("/questions/:id", question.getOneQst);
// update one quiz question
router.patch("/questions/:id",  question.updateQst);
// delete one quiz question
router.delete("/questions/:id", question.deleteQst);
//get all questions
router.get("/questions",  question.getAllQsts);
//getQuestionBySubject
router.get("/subjects/:id/questions",  question.getQstsBySubject);


//create subject
router.post("/subject", question.createSubject);

//getAllSubjects
router.get("/subjects", question.getAllSubjects);
//getSubjectById
router.get("/subjects/:id", question.getSubjectById);

//delete subject by id 
router.delete("/subjects/:id", question.deleteSubject);


//retrieve all candidats
router.get("/candidats",  candidat.findAll);
router.get("/candidats/:id",  candidat.findOne);
router.delete("/candidats/:id",  candidat.delete);
router.get(
  "/offres/:id/candidats",
  candidat.getCandidatsByOffre
);
router.get("/candidats/:id/CV", candidat.getCv);

module.exports = router;
