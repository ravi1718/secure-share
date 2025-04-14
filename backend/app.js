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
    try{
      await fileDetails.create({title : title,file: file});
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

    }
  })

  app.listen(5000,()=>{
    console.log("Server started on port 5000");
  })