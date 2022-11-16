const exerciseModel = require("../model/exercise");
const userModel = require("../model/user");

const addNewExercise = async (req, res) => {
  try {
    const { bodyPart, equipment, gifUrl, name, target, user_id } = req.body;
    const user = await userModel.findOne({ _id: user_id });
    if (!user) return res.status(500).json({ message: "User not found" });
    if (!user.isAdmin)
      return res.status(500).json({ message: "Unauthorised user" });
    if (!bodyPart || !equipment || !name || !target) {
      return res.status(500).json({ message: "enter all the fields" });
    }
    const result = await exerciseModel.create({
      bodyPart: bodyPart,
      equipment: equipment,
      name: name,
      target: target,
      gifUrl: gifUrl
        ? gifUrl
        : "https://demofree.sirv.com/nope-not-here.jpg?w=300",
    });
    console.log("New Exercise Added");
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteExercise = async (req, res) => {
  try {
    const { user_id, exercise_id } = req.body;
    const user = await userModel.findOne({ _id: user_id });
    const exercise = await exerciseModel.findOne({ _id: exercise_id });
    if (!user || !exercise) {
      return res
        .status(404)
        .json({ message: "User not found or exercise not found" });
    }
    if (!user) return res.status(500).json({ message: "User not found" });
    if (!user.isAdmin)
      return res.status(500).json({ message: "Unauthorised user" });
    const deleted = await exerciseModel.findByIdAndDelete(exercise_id);
    res.status(201).json({ message: "Deleted Exercise Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateExercise = async (req, res) => {
  try {
    const { user_id, exercise_id } = req.body;
    const user = await userModel.findOne({ _id: user_id });
    const exercise = await exerciseModel.findOne({ _id: exercise_id });
    if (!user || !exercise) {
      return res
        .status(404)
        .json({ message: "User not found or exercise not found" });
    }
    if (!user) return res.status(500).json({ message: "User not found" });
    if (!user.isAdmin)
      return res.status(500).json({ message: "Unauthorised user" });
    const updatedExercise = await exerciseModel.findByIdAndUpdate(exercise_id, {
      $set: req.body,
    });
    console.log("updated successfully");
    res.status(201).json(updatedExercise);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { addNewExercise, deleteExercise, updateExercise };
