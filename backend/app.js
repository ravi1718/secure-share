const fs = require('fs');
const path = require('path');
const express = require ('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer')
require("./fileDetails");
const fileDetails = mongoose.model("fileDetails");
app.use("/files",express.static('files'));

app.use(express.json());
app.use(cors());

// mongodb connection

const mongourl = "mongodb://localhost:27017/files"

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e)=>{
    console.log(e);
  })

  // api's----

  app.get("/", async(req,res)=>{
    res.send("Hello world");
  });


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,  uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post("/upload-files", upload.single('file'), async(req,res)=>{ 
    const title = req.body.title;
    const file = req.file.filename;
    const category = req.body.category;
    console.log(title,file,category);
    try{
      await fileDetails.create({title : title,file: file, category: category});
      res.send({status: "ok"});
    } catch(error){
      res.json({status: "error"});
    }
  })

  app.get("/get-files", async(req,res)=>{
    try {
      const data = await fileDetails.find({}).collation({ locale: "en" });
      res.send({ status: "ok", data: data });
    } catch(e){
      console.error("Get files error:", e);
    res.status(500).json({ status: "error", message: "Failed to fetch files" });
    }
  })

  // DELETE route to remove file
app.delete("/delete-file/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find file by ID
    const fileData = await fileDetails.findById(id);
    if (!fileData) {
      return res.status(404).json({ status: "error", message: "File not found" });
    }

    // Remove file from disk
    const filePath = path.join(__dirname, "files", fileData.file);
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File deletion error:", err);
        return res.status(500).json({ status: "error", message: "Failed to delete file" });
      }

      // Delete from database
      await fileDetails.findByIdAndDelete(id);
      res.json({ status: "ok", message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

  app.listen(5000,()=>{
    console.log("Server started on port 5000");
  })