const exerciseModel = require("../model/exercise");
const userModel = require("../model/user");
const { use } = require("../routes/exerciseRoutes");

const getAllBookMarks = async (req, res) => {
  console.log(req.body);
  try {
    const { user_id } = req.body;
    const data = await userModel.findOne({ _id: user_id });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(data.bookMarks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addBookMark = async (req, res) => {
  try {
    const { user_id, exercise_id } = req.body;
    const user = await userModel.findOne({
      _id: user_id ? user_id : "864768364838",
    });
    const exercise = await exerciseModel.findOne({ _id: exercise_id });
    if (!user && !exercise) {
      return res
        .status(404)
        .json({ message: "User not found and exercise not found" });
    }
    const updateLikes = await exerciseModel.findOneAndUpdate(
      { _id: exercise_id },
      { $inc: { likes: 1 } }
    );
    let updatedUser;
    if (user && user.bookMarks.includes(exercise_id)) {
      return res.status(500).json({ message: "already present" });
    } else if (user) {
      console.log("updated in the user database");
      user.bookMarks.push(exercise._id);
      updatedUser = await userModel.findByIdAndUpdate(
        user_id,
        {
          $set: user,
        },
        { new: true }
      );
      res
        .status(201)
        .json({ user: updatedUser ? updatedUser : {}, exercise: updateLikes });
    }

    console.log("exercise liked");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteBookMark = async (req, res) => {
  try {
    const { user_id, exercise_id } = req.body;
    let user = await userModel.findOne({ _id: user_id });
    const exercise = await exerciseModel.findOne({ _id: exercise_id });
    if (!user || !exercise) {
      return res
        .status(404)
        .json({ message: "User not found or exercise not found" });
    }
    if (!user.bookMarks.includes(exercise_id))
      return res.status(500).json({ message: "Not present in exercise" });
    user.bookMarks.remove(exercise._id);
    const updatedUser = await userModel.findByIdAndUpdate(
      user_id,
      {
        $set: user,
      },
      { new: true }
    );
    const updateLikes = await exerciseModel.findOneAndUpdate(
      { _id: exercise_id },
      { $inc: { likes: -1 } }
    );
    // console.log(updateLikes);
    console.log("bookmark deleted");
    res.status(201).json({ user: updatedUser, exercise: updateLikes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getAllBookMarks, addBookMark, deleteBookMark };
