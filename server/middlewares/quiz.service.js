const db = require("../models");
const Quiz = db.Quiz;
  exports.getAll= function () {
    var promise = new Promise(function (resolve, reject) {
      Quiz.find({}, function (err, quizzes) {
        if (err) {
          reject(err);
        } else {
          resolve(quizzes);
        }
      });
    });

    return promise;
  },
  exports.add= function (quiz) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.create(quiz, function (err, quiz) {
        if (err) {
          reject(err);
        } else {
          resolve(quiz);
        }
      });
    });

    return promise;
  },
  exports.getQuizByName= function (name) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.find({ name: name }, function (err, quiz) {
        if (err) {
          reject(err);
        } else {
          resolve(quiz);
        }
      });
    });

    return promise;
  },
  exports.getQuizById= function (id) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.findOne({ _id: id }, function (err, quiz) {
        if (err) {
          reject(err);
        } else {
          resolve(quiz);
        }
      });
    });

    return promise;
  },
  exports.update= function (id, quiz) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.update({ _id: id }, quiz, function (err, quizzes) {
        if (err) {
          reject(err);
        } else {
          resolve(quizzes);
        }
      });
    });

    return promise;
  },
  exports.getQuestionssByQuizId= function (id) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.findOne({ _id: id })
        .populate({
          path: "questions",
        })
        .exec(function (err, quiz) {
          if (err) {
            reject(err);
          } else {
            resolve(quiz);
          }
        });
    });

    return promise;
  },
  
 exports.removeQuizById= function (id) {
    var promise = new Promise(function (resolve, reject) {
      Quiz.find({ _id: id }).remove(function (err, removedCount) {
        if (err) {
          reject(err);
        } else {
          resolve(removedCount);
        }
      });
    });

    return promise;
  }


exports.Quiz = async (id) => {
  const quizs = await Quiz.find({_id:id}).populate({
    path: "questions.questionId",
  });
  return quizs[0];
};
