module.exports = (mongoose) => {
  var quizSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },

      questions: [{
        
        questionId: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
          },
        ],
      }
        
      ],
      expiry: {
        type: Date,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Quiz = mongoose.model("Quiz", quizSchema);
  return Quiz;
}

