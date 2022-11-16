const express = require("express");

const {
  equipmentsSearch,
  targetSearch,
  bodyPartSearch,
  bodyPartList,
  targetList,
  equipmentList,
  searchByID,
  searchAllExercies,
  searchByName,
} = require("../controllers/exerciseControllers");

const exerciseRoute = express.Router();

exerciseRoute.get("/", searchAllExercies);
exerciseRoute.get("/bodyPartList", bodyPartList);
exerciseRoute.get("/targetList", targetList);
exerciseRoute.get("/equipmentList", equipmentList);
exerciseRoute.get("/exercise/:id", searchByID);
// exerciseRoute.get("/name/:id", searchByName);
exerciseRoute.get("/equipments/:equipment", equipmentsSearch);
exerciseRoute.get("/target/:target", targetSearch);
exerciseRoute.get("/bodyPart/:bodyPart", bodyPartSearch);

module.exports = exerciseRoute;
