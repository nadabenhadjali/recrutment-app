module.exports = (mongoose) => {
  var UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  
  });
  const user = mongoose.model("user", UserSchema);
  return user;
};
