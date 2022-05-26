var quizzesService = require("./quiz.service.js"),
  questionsService = require("./question.service.js");

module.exports = {

  quizzes:quizzesService,
  questions: questionsService,
};
