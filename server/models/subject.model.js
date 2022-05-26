module.exports = (mongoose) => {
  var SubjectSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
   
  });
  const Subject = mongoose.model("Subject", SubjectSchema);
  return Subject;
};
