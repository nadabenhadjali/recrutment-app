module.exports = (mongoose) => {
  var CandidatSchema = mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },

    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: false,
    },
    photo: {
      type: String,
    },
    offres:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "offre",
    },]
  });
  const candidat = mongoose.model("candidat", CandidatSchema);
  return candidat;
};
