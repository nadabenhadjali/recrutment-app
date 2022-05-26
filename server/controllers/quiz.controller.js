var services = require("../middlewares");
const db = require("../models");
const Result = db.result;
const Quiz = db.Quiz;

(exports.getAll = function (req, res) {
  services.quizzes.getAll().then(
    function (quizzes) {
      res.send(quizzes);
    },
    function (err) {
      res.status(404).send(err);
    }
  );
}),
  (exports.add = function (req, res) {
    var newQuiz = req.body;
    services.quizzes.add(newQuiz).then(
      function (quiz) {
        res.send(quiz);
      },
      function (err) {
        res.send(err);
      }
    );
  }),
  (exports.deleteQuiz = function (req, res) {
    var id = req.params.id;

    services.quizzes.removeQuizById(id).then(
      function (quiz) {
        res.send(quiz);
      },
      function (err) {
        res.send(err);
      }
    );
  });
exports.getQuizById = function (req, res) {
  var id = req.params.id;

  services.quizzes.getQuizById(id).then(
    function (quiz) {
      res.send(quiz);
    },
    function (err) {
      res.send(err);
    }
  );
};
exports.getQuestionssByQuizId = function (req, res) {
  var id = req.params.id;

  services.quizzes
    .getQuestionssByQuizId(id)
    .then(
      function (questions) {
        res.send(questions);
      },
      function (err) {
        res.send(err);
      }
    );
};

exports.addQuestionToQuiz = async (req, res) => {
  const { questionId } = req.body;

  try {
    var id = req.params.id;

    let quiz = await services.quizzes.Quiz(id);
    let questionDetails = await services.questions.getQuestionById(questionId);
    if (!questionDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    //--If Quiz Exists ----
    if (quiz) {
      //---- check if index exists ----
      const indexFound = quiz.questions.findIndex(
        (question) => question.questionId == questionId
      );

      //----------check if question exist-------
      if (indexFound !== -1) {
        return res.status(400).json({
          type: "Invalid",
          msg: "question exists",
        });
      } else {
        quiz.questions.push({
          questionId: questionId,
        });
      }

      let data = await quiz.save();
      res.status(200).json({
        type: "success",
        msg: "Process Successful",
        data: data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

//submit quiz

exports.submitQuiz = (req, res) => {
  let result = new Result({
    answers: req.body.answers,
    quizId: req.body.quizId,
    candidatId: req.body.candidatId,
  });
  result.save().then(async (resp) => {
    await Quiz.updateOne(
      { _id: req.body.quizId },
      {
        $push: {
          result: resp._id,
        },
      }
    );
    res.status(200).json({ results: resp._id });
  });
};

//get quiz results
exports.getResult = (req, res) => {
  if (!req.params.id) {
    res.status(500).send("No id provided in params");
  } else {
    Result.findOne({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          res.status(500).send("Error finding score");
        } else {
          Quiz.findOne({ _id: data.quizId }).then((quiz) => {
            if (!quiz) {
              res.status(500).send("Error getting quiz");
            } else {
              res.status(200).json({ result: data, quiz: quiz });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error finding score");
      });
  }
};
exports.getQuizQuestions = (req, res) => {

  
 
};
//remove question
exports.removeFromQuiz = function (questionId) {
  const updatedQuizQuestions = Quiz.questions.filter((question) => {
    return question.questionId.toString() !== questionId.toString();
  });
  Quiz.questions = updatedQuizQuestions;
  return save();
};