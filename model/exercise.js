const mongoose = require("mongoose");

const ExerciseSchema = mongoose.Schema(
  {
    bodyPart: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    gifUrl: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg?w=300",
    },
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
