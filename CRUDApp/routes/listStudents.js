const mongoose = require("mongoose");
const express = require("express");
const listStudentsRouter = express.Router();
const bodyParser = require("body-parser");
const Students = require("../models/students");

listStudentsRouter.use(bodyParser.json());
listStudentsRouter.route("/studentlist").get((req, res, next) => {
  Students.find({})
    .then(
      student => {
        res.render("studentlist", { students: student });
      },
      err => {
        next(err);
      }
    )
    .catch(err => {
      next(err);
    });
});

module.exports = listStudentsRouter;
