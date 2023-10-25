const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const Questions = require("../Models/questionsModel");
const Food = require("../Models/foodModel");
const UserDet = require("../Models/userModel");
const requireAuth = require("../Middleware/requireAuth");
const router = express.Router();
let nutrients = [];

// router.use(requireAuth)
//------------------------------------------------------------
                    // Get nutrients
//------------------------------------------------------------
router.get("/get-nutrients", async (req, res) => {
  try {
    if (nutrients.length === 0) {
      return res.status(404).json({ error: "No nutrients found" });
    }

    const top6 = []; 
    for (const nutrient of nutrients) {
      const foundNutrient = await Food.findOne({ name: { $in: {$toLower: [nutrient]} } });

      if (foundNutrient) {
        // If the nutrient is found, add it to the top6 array
        top6.push(foundNutrient);
      } else {
        // If the nutrient is not found, you can handle it as needed (e.g., skip or report an error)
        console.log(`Nutrient not found in the database: ${nutrient}`);
      }
      if(top6.length == 6){
        break;
      }
    }

    res.status(200).json(top6); // Send the top6 array containing nutrient information to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
                    // Upload the file
//------------------------------------------------------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.use("/uploads", express.static(path.join(__dirname, "uploads")));

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const uploadedFile = req.file;
  const filePath = uploadedFile.path;
  res
    .status(200)
    .json({ message: "File uploaded successfully", filePath: filePath });
});

//------------------------------------------------------------
                  // clear uploads folder
//------------------------------------------------------------
const parentDirectory = path.join(__dirname, "..");
const folderPath = path.join(parentDirectory, "uploads"); 
router.get("/delete-files", (req, res) => {

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

//------------------------------------------------------------
                  // Run the model
//------------------------------------------------------------
router.get("/run-python-script", (req, res) => {
  let stdout = "";
  let stderr = "";

  console.log(__dirname); 
  const pythonScriptPath = path.resolve(__dirname, "model.py");
  const pythonScriptCommand = `python "${pythonScriptPath}"`;
  console.log(pythonScriptCommand);
  const pythonProcess = exec(pythonScriptCommand);

  pythonProcess.stdout.on("data", (data) => {
    stdout += data;
  });

  pythonProcess.stderr.on("data", (data) => {
    stderr += data;
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Error: Python script exited with code ${code}`);
    }

    // Process the Python script's output and stderr
    const output = stdout.split("\n").filter(Boolean);
    const noutput = output.map((element) => element.replace(/\r/g, ''));
    const errorOutput = stderr.split("\n").filter(Boolean);
    nutrients = noutput;
    res.json({ noutput, errorOutput });
  });
});
module.exports = router;
