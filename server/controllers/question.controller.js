const db = require("../models");
const Question = db.Question;
const Subject = db.subject;
const mongoose = require("mongoose");

// get all quiz questions
exports.getAllQsts=async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// get one quiz question
exports.getOneQst = async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.findOne({ _id });
    if (!question) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// create one quiz question
exports.createQst = (req, res) => {
    
    const description  = req.body.description;
    const answers = req.body.answers;
  const time = req.body.time;
  const subject = req.body.subject;
    const correct_answer = req.body.correct_answer;


    const newQuestionData = {
     description,
      answers,
     correct_answer,
      time,
     subject,
      
  };

    const newQuestion= new Question(newQuestionData);
    //newQuestion.subject = req.params.id;

   newQuestion
     .save()
     .then(() => res.json("succes"))
     .catch((err) => res.status(400).json("Error: " + err));
 };
 

// update one quiz question
exports.updateQst = async (req, res) => {
  try {
    const _id = req.params.id;
    const { description, answers, correct_answer } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        answers,
        correct_answer,
      });
      return res.status(201).json(question);
    } else {
      // updates only the given fields
      if (description) {
        question.description = description;
      }
      if (answers) {
        question.answers = answers;
      }
        if (correct_answer) {
          question.correct_answer = correct_answer;
        }
      await question.save();
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// delete one quiz question
exports.deleteQst = async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.deleteOne({ _id });

    if (question.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
//creates a new subject
exports.createSubject = (req, res) => {
  
  const subject = new Subject({
    name: req.body.name,
   
  });
  // Save offer in the database
    subject
      .save(subject)
      .then((data) => {
        res.send({
          message: "subject added",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the subject.",
        });
      });
};

//get all subjects
exports.getAllSubjects=  (req, res) => {
     Subject.find()
       .then((data) => {
         res.send(data);
       })
       .catch((err) => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving subject.",
         });
       });
}

//get all questions +from a specific subject
exports.getQstsBySubject = async(req, res) => {
  try {
      const _id = req.params.id

      const questions = await Question.find({ subject: _id });
      return res.status(200).json(questions)
    } catch (error) {
      return res.status(500).json({ "error": error })
    }
};
exports.deleteSubject = (req, res) => {
  const id = req.params.id;
  Subject.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete subject with id=${id}. Maybe subject was not found!`,
        });
      } else {
        res.send({
          message: "subject was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete subject with id=" + id,
      });
    });
};


