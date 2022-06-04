var services = require("../middlewares");
const db = require("../models");
const Result = db.result;
const Quiz = db.Quiz;

exports.getAll = async (req, res) => {
  try {
    const doc = await Quiz.find().sort("-created").exec();
    return res.send(doc);
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
};
  exports.add =async (req, res)=> {
  const name = req.body.name;
  const instructions = req.body.instructions;
  const time = req.body.time;
  const expiry = Date.parse(req.body.expiry);


    const newtest = new Quiz({
      
      name,
      instructions,
      time,
      expiry,
    });
  newtest
    .save()
    .then(() => res.send("quiz added!"))
    .catch((err) => res.status(400).json("error : " + err));
};
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
exports.getQuestionsByQuizId = function (req, res) {
  var id = req.params.id;

  services.quizzes
    .getQuestionsByQuizId(id)
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

exports.submitQuiz =async (req, res) => {
  const email = req.body.email.toLowerCase();
  const name = req.body.name;
  const ans = req.body.ans;

  const resultEntry = new Result({ email, name ,ans});
  resultEntry
    .save()
    .then(() => res.send("result added!"))
    .catch((err) => res.status(400).json("error : " + err));
};

//get quiz results
exports.getResult = async (req, res) => {
  try {
    const resultdoc = await Result.find({ _id }).exec();
    return res.send(resultdoc);
  } catch (err) {
    return res.status(400).send();
  }
};
exports.getQuizQuestions = (req, res) => {

  var id = req.params.id;

  services.quizzes.getQuestionsByQuizId(id).then(
    function (quiz) {
      res.send(quiz);
    },
    function (err) {
      res.send(err);
    }
  );
};

  
 


exports.takeQuiz = async (req, res) => {
  const id = req.params;
  const email = req.body.email.toLowerCase();
  const doc = await Quiz.findOne({_id:id}).exec();
  if (!doc) {
    return res.status(400).send({ message: "Quiz doesn't exist!" });
  }
  if (Date.parse(doc.expiry) < Date.now()) {
    return res.status(400).send({ message: "Quiz has expired!! " });
  }
  const check = await Result.findOne({ quizId:id, email }).exec();
  if (check) {
    return res.status(400).send({ message: "Quiz already taken!" });
  }
  const questions = await getQuestionsByQuizId({ id }).exec();
  questions.time = doc.time;
  if (questions.response_code == 0) return res.send(questions);
  else
    return res
      .status(400)
      .send({ message: "Couldn't fetch quiz details. Try again!" });
};