const mongoose = require("mongoose");

const fileDetailsSchema = new mongoose.Schema({
  file: String,
  title: String,
  category: String,
});

mongoose.model("fileDetails", fileDetailsSchema);