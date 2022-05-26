const db = require("../models");
const Question = db.Question;
module.exports = {
  add: function (question) {
    var promise = new Promise(function (resolve, reject) {
      Question.create(question, function (err, question) {
        if (err) {
          reject(err);
        } else {
          resolve(question);
        }
      });
    });

    return promise;
  },



  getAll: function () {
    var promise = new Promise(function (resolve, reject) {
      Question.find({}, function (err, questions) {
        if (err) {
          reject(err);
        } else {
          resolve(questions);
        }
      });
    });

    return promise;
  },
  getQuestionById: function (id) {
    var promise = new Promise(function (resolve, reject) {
      Question.findOne({ _id: id }, function (err, question) {
        if (err) {
          reject(err);
        } else {
          resolve(question);
        }
      });
    });

    return promise;
  },
  deleteQuestionById: function (id) {
    var promise = new Promise(function (resolve, reject) {
      Question.remove({ _id: id }, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return promise;
  },
};
