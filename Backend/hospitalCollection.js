const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Hospital");

let adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profileImage: String,
});
let doctorSchema = new mongoose.Schema({
  doctor_name: String,
  DoB: Date,
  Specialization: String,
  Experience: String,
  age: Number,
  phoneNumber: String,
  email: String,
  gender: String,
  doctorDetails: String,
  address: String,
  doctorImage: String,
  Status: {
    type: String,
    default: "Active",
  },
});
let doctorModel = mongoose.model("doctors", doctorSchema);

let adminModel = mongoose.model("admin", adminSchema);

module.exports = { adminModel, doctorModel };
