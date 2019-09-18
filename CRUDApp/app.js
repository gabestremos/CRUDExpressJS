var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const listStudentsRouter = require("./routes/listStudents");
const readStudentRouter = require("./routes/readStudent");
const createStudentRouter = require("./routes/createStudent");
const updateStudentRouter = require("./routes/updateStudent");
const deleteStudentRouter = require("./routes/deleteStudent");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/CRUD";
const connect = mongoose.connect(url);
connect.then(
  db => {
    console.log("Connected successfully to CRUD collection!");
  },
  err => {
    console.log(err);
  }
);

// view engine setup
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let infos = [];
app.locals.infos = infos;
app.use("/", listStudentsRouter);
app.use("/", createStudentRouter);
app.use("/", updateStudentRouter);
app.use("/", deleteStudentRouter);
app.use("/", readStudentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error.jade");
});

module.exports = app;
