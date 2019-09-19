const mongoose = require("mongoose");
const express = require("express");
const updateStudentRouter = express.Router();
const Students = require("../models/students");

updateStudentRouter.route("/edit/:sid").get((req, res, next) => {
  Students.find({ sid: req.params.sid })
    .then(
      student => {
        res.render("edit", { students: student });
      },
      err => {
        return next(err);
      }
    )
    .catch(err => {
      return next(err);
    });
});
updateStudentRouter.route("/edit/:sid").post((req, res, next) => {
  Students.update({ sid: req.params.sid }, { $set: req.body }, { new: true })
    .then(
      student => {
        res.redirect("/studentlist");
      },
      err => {
        return next(err);
      }
    )
    .catch(err => {
      return next(err);
    });
});
module.exports = updateStudentRouter;
