module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      intituleDuPoste: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      langages: [
        {
          type: String,
          required: true,
        },
      ],
      utils: [
        {
          type: String,
        },
      ],
      role: {
        type: String,
      },
      experienceRequise: {
        type: String,
        required: true,
      },
      TypeContrat: {
        type: String,
        required: true,
      },
      duréeContrat: {
        type: String,
      },
      isEnabled: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const offre = mongoose.model("offre", schema);
  return offre;
};
