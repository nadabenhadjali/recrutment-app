module.exports = (mongoose) => {

  var QuestionSchema = mongoose.Schema({
    questionName: String,

    description: String,
    answers: [
      {
      
          type: String,
          required: true,
        
      },
      
    ],
    correct_answer: {
      type: String,
      required:true,

    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    time: {
      type: String,
      //required: true,
    },
  });


  const Question = mongoose.model("Question", QuestionSchema);
  return Question;
}
