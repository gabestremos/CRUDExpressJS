const mongoose = require("mongoose");
const express = require("express");
const deleteStudentRouter = express.Router();
const Students = require("../models/students");
const regExp = /[0-9]{4}\b-[0-9]{5}\b/;

deleteStudentRouter.route("/delete/:sid").get((req, res, next) => {
  Students.find({ sid: req.params.sid }).then(student => {
    if (student != null) {
      Students.remove({ sid: req.params.sid })
        .then(
          resp => {
            res.redirect("/studentlist");
          },
          err => {
            next(err);
          }
        )
        .catch(err => {
          next(err);
        });
    } else if (regExp.test(req.params.sid)) {
      res.status(404);
      err = new Error("Invalid SID!");
      return next(err);
    } else {
      err = new Error("SID not found!");
      res.status(404);
      return next(err);
    }
  });
});
module.exports = deleteStudentRouter;
