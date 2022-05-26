module.exports = (mongoose) => {

    var resultSchema = mongoose.Schema(
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        answers: {
          type: Array,
          required: true,
        },
        candidatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "candidat",
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    const result = mongoose.model("result", resultSchema);

    return result;
    
}