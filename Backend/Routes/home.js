const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const Questions = require("../Models/questionsModel");
const UserDet = require("../Models/userModel");
const requireAuth = require("../Middleware/requireAuth");
const router = express.Router();

// router.use(requireAuth)

// get questions
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find({}).sort({ questionNumber: 1 });

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Serve uploaded files as static content
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle file upload
router.post("/upload", upload.single("image"), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Access information about the uploaded file
  const uploadedFile = req.file;
  const filePath = uploadedFile.path;
  res
    .status(200)
    .json({ message: "File uploaded successfully", filePath: filePath });
});

const parentDirectory = path.join(__dirname, "..");
const folderPath = path.join(parentDirectory, "uploads"); // Change 'your_folder_name' to the folder's actual name
router.get("/delete-files", (req, res) => {
  // Delete all files within the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      res.status(500).send("Unable to read the directory.");
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });  
    res.send("All files in the folder have been deleted.");
  });
});

  router.get('/run-python-script', (req, res) => {
    let stdout = '';
    let stderr = '';

  console.log(__dirname); // Current directory of your Node.js script
  // const pythonScriptPath = path.resolve(__dirname, '../Utilities/model.py');
  // console.log(pythonScriptPath); // Absolute path to the Python script
    const pythonScriptPath = path.resolve(__dirname, 'model.py');
    const pythonScriptCommand = `python "${pythonScriptPath}"`;
    console.log(pythonScriptCommand);
    const pythonProcess = exec(pythonScriptCommand);

    pythonProcess.stdout.on('data', (data) => {
      stdout += data;
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data;
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Error: Python script exited with code ${code}`);
      }

      // Process the Python script's output and stderr
      const output = stdout.split('\n').filter(Boolean);
      const errorOutput = stderr.split('\n').filter(Boolean);

      res.json({ output, errorOutput });
    });
  });
module.exports = router;
