const mongoose = require("mongoose");

const fileDetailsSchema = new mongoose.Schema({
  file: String,
  title: String,
},{collation: "fileDetails"});

mongoose.model("fileDetails", fileDetailsSchema);