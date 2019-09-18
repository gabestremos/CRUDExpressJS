const mongoose = require("mongoose");
const express = require("express");
const readStudentRouter = express.Router();
const bodyParser = require("body-parser");
const Students = require("../models/students");
const regExp = /[0-9]{4}-[0-9]{5}/;

readStudentRouter.route("/profile/:sid").get((req, res, next) => {
  Students.find({ sid: req.params.sid })
    .then(
      student => {
        console.log(student);
        if (student != null) {
          res.render("profile", { students: student });
        } else if (regExp.test(req.params.sid)) {
          res.status(404);
          err = new Error("Invalid SID!");
          return next(err);
        } else {
          res.status(404);
          err = new Error("SID not found!");
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
