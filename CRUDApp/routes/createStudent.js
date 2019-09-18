const express = require("express");
const path = require("path");
const createStudentRouter = express.Router();
const mongoose = require("mongoose");
const Students = require("../models/students");
const rootDir = require("../util/path");

createStudentRouter.route("/create").get((req, res, next) => {
  res.render("create");
});
createStudentRouter.route("/create").post((req, res, next) => {
  Students.find({ sid: req.body.sid }).then(student => {
    if (!student) {
      Students.create(req.body)
        .then(
          student => {
            console.log("Student Created!", student);
            res.redirect("/studentlist");
          },
          err => console.log(err)
        )
        .catch(err => next(err));
    } else {
      res.status(404);
      err = new Error("SID is already used!");
      return next(err);
    }
  });
});

module.exports = createStudentRouter;
