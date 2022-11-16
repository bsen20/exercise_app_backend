const express = require("express");
const {
  getAllBookMarks,
  addBookMark,
  deleteBookMark,
} = require("../controllers/bookmarkController");
const bookMarkRoute = express.Router();

bookMarkRoute.put("/", addBookMark);
bookMarkRoute.put("/all", getAllBookMarks);
bookMarkRoute.delete("/", deleteBookMark);
module.exports = bookMarkRoute;
