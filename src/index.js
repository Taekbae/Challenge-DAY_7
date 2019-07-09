import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

// Add your magic here!

const multerVideo = multer({ dest: "uploads/" });
const multerUploadVideo = multerVideo.single("textfile");

const home = (req, res) => {
  res.render("upload");
};

const uploadText = (req, res) => {
  fs.readFile(req.file.path, "utf-8", (err, data) => {
    if (err) throw err;
    res.render("uploadfile", {
      uploadFilename: req.file.originalname,
      uploadFilecontents: data
    });
  });
};

app.get("/", home);
app.post("/upload", multerUploadVideo, uploadText);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
