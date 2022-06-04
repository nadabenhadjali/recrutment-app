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
        },
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
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
