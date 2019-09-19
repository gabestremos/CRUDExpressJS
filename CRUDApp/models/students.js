const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  sid: {
    type: String,
    validate: {
      validator: s => {
        return /[0-9]{4}\b-[0-9]{5}\b/.test(s);
      },
      message: msg => `${msg.value} is not a valid SID!`
    },
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ["Freshman", "Junior", "Sophomore", "Senior"]
  },
  birthday: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Regular", "Irregular"]
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  }
});
const Students = mongoose.model("Student", studentSchema);
module.exports = Students;
