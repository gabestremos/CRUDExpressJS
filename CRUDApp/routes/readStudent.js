const mongoose = require("mongoose");
const express = require("express");
const readStudentRouter = express.Router();
const bodyParser = require("body-parser");
const Students = require("../models/students");
const regExp = /\d{4}\b-\d{5}\b/;

readStudentRouter.route("/profile/:sid").get((req, res, next) => {
  Students.find({ sid: req.params.sid })
    .then(
      student => {
        if (student != "") {
          console.log(student);
          res.render("profile", { students: student });
        } else if (regExp.test(req.params.sid) == false) {
          res.status(500);
          err = new Error("Invalid SID!");
          return next(err);
        } else {
          res.status(404);
          err = new Error("SID not found!");
          return next(err);
        }
      },
      err => {
        console.log(err);
      }
    )
    .catch(err => {
      console.log(err);
    });
});

module.exports = readStudentRouter;
