const exerciseModel = require("../model/exercise");

const equipmentsSearch = async (req, res) => {
  try {
    const equipment = req.params.equipment;
    const data = await exerciseModel.find({ equipment: equipment });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const targetSearch = async (req, res) => {
  try {
    const target = req.params.target;
    const data = await exerciseModel.find({ target: target });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const bodyPartList = async (req, res) => {
  try {
    const data = await exerciseModel.distinct("bodyPart");
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const bodyPartSearch = async (req, res) => {
  try {
    const bodyPart = req.params.bodyPart;
    const data = await exerciseModel.find({ bodyPart: bodyPart });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const targetList = async (req, res) => {
  try {
    const data = await exerciseModel.distinct("target");
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const equipmentList = async (req, res) => {
  try {
    const data = await exerciseModel.distinct("equipment");
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchByName = async (req, res) => {
  try {
    const name = req.params.name;
    // const d = await exerciseModel.createIndexes({ name: "text" });
    const data = await exerciseModel.find({ name: { $regex: `${name}` } });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchByID = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await exerciseModel.findOne({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchAllExercies = async (req, res) => {
  try {
    const data = await exerciseModel.find({});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  equipmentsSearch,
  targetSearch,
  bodyPartSearch,
  bodyPartList,
  targetList,
  equipmentList,
  searchByID,
  searchAllExercies,
  searchByName,
};
