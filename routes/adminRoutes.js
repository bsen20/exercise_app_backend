const express = require("express");
const {
  addNewExercise,
  deleteExercise,
  updateExercise,
} = require("../controllers/adminController");

const adminRoutes = express.Router();

adminRoutes.post("/exercise", addNewExercise);
adminRoutes.delete("/exercise", deleteExercise);
adminRoutes.put("/exercise", updateExercise);

module.exports = adminRoutes;
