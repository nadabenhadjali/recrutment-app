module.exports = (mongoose) => {
  var quizSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },

      instructions: {
        type: String,
        required: true,
      },

      isEnabled: {
        type: Boolean,
        default: true,
      },
      questions: [
        {
          questionId: {
            type: String,
            ref: "Question",
          },
        },
      ],

      results: { type: Array, default: [] },
    },

    {
      timestamps: true,
    }
  );

  const Quiz = mongoose.model("Quiz", quizSchema);
  return Quiz;
}

