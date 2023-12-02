const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const Questions = require("../Models/questionsModel");
const Food = require("../Models/foodModel");
const UserDet = require("../Models/userModel");
const NoPregnancy = require("../Models/NoPregnancyModel");
const NoCardiac = require("../Models/NoCadiacModel");
const NoChild = require("../Models/NoChildModel");
const NoDiabetic = require("../Models/NoDiabeticModel");
const requireAuth = require("../Middleware/requireAuth");
const router = express.Router();
let nutrients = [];
let nutrients_details = [];



//------------------------------------------------------------
// Should I reccomend to pregnent?
//------------------------------------------------------------
router.get("/is-rec-pregnant", async (req, res) => {
  try {
    if (!nutrients_details || nutrients_details.length === 0) {
      return res.status(400).json({ error: "No nutrients_details found" });
    }

    let countOfIngredientsNotRecommended = 0;
    let ingredientsNotEat = [];
    let ingredientsNotEatUnique;

    for (const nutrientDetail of nutrients_details) {
      if (
        !nutrientDetail ||
        !nutrientDetail.name ||
        !Array.isArray(nutrientDetail.name)
      ) {
        continue;
      }

      for (const nameElement of nutrientDetail.name) {
        if (!nameElement) {
          continue;
        }

        const ingredientFound = await NoPregnancy.findOne({
          name: { $regex: new RegExp(nameElement, "i") },
        });

        if (ingredientFound) {
          ingredientsNotEat.push(ingredientFound.name);
        }
      }
      ingredientsNotEatUnique = Array.from(new Set(ingredientsNotEat));
    }
    res.status(200).json({
      count: ingredientsNotEatUnique.length,
      ingredients: ingredientsNotEatUnique.length > 2 ? ingredientsNotEatUnique.slice(0, 2): ingredientsNotEatUnique
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
// Should I recommend to Cardiac Patient?
//------------------------------------------------------------
router.get("/is-rec-cardiac", async (req, res) => {
  try {
    if (!nutrients_details || nutrients_details.length === 0) {
      return res.status(400).json({ error: "No nutrients_details found" });
    }

    let countOfIngredientsNotRecommended = 0;
    let ingredientsNotEat = [];
    let ingredientsNotEatUnique;

    for (const nutrientDetail of nutrients_details) {
      if (
        !nutrientDetail ||
        !nutrientDetail.name ||
        !Array.isArray(nutrientDetail.name)
      ) {
        continue;
      }

      for (const nameElement of nutrientDetail.name) {
        if (!nameElement) {
          continue;
        }

        const ingredientFound = await NoCardiac.findOne({
          name: { $regex: new RegExp(nameElement, "i") },
        });

        if (ingredientFound) {
          ingredientsNotEat.push(ingredientFound.name);
        }
      }
      ingredientsNotEatUnique = Array.from(new Set(ingredientsNotEat));
    }

    res.status(200).json({
      count: ingredientsNotEatUnique.length,
      ingredients: ingredientsNotEatUnique.length > 2 ? ingredientsNotEatUnique.slice(0, 2): ingredientsNotEatUnique
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
// Should I recommend to Child?
//------------------------------------------------------------
router.get("/is-rec-child", async (req, res) => {
  try {
    if (!nutrients_details || nutrients_details.length === 0) {
      return res.status(400).json({ error: "No nutrients_details found" });
    }

    let countOfIngredientsNotRecommended = 0;
    let ingredientsNotEat = [];
    let ingredientsNotEatUnique;

    for (const nutrientDetail of nutrients_details) {
      if (
        !nutrientDetail ||
        !nutrientDetail.name ||
        !Array.isArray(nutrientDetail.name)
      ) {
        continue;
      }

      for (const nameElement of nutrientDetail.name) {
        if (!nameElement) {
          continue;
        }

        const ingredientFound = await NoChild.findOne({
          name: { $regex: new RegExp(nameElement, "i") },
        });

        if (ingredientFound) {
          ingredientsNotEat.push(ingredientFound.name);
        }
      }
      ingredientsNotEatUnique = Array.from(new Set(ingredientsNotEat));
    }

    res.status(200).json({
      count: ingredientsNotEatUnique.length,
      ingredients: ingredientsNotEatUnique.length > 2 ? ingredientsNotEatUnique.slice(0, 2): ingredientsNotEatUnique
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
// Should I recommend to Diabetic?
//------------------------------------------------------------
router.get("/is-rec-diabetic", async (req, res) => {
  try {
    if (!nutrients_details || nutrients_details.length === 0) {
      return res.status(400).json({ error: "No nutrients_details found" });
    }

    let countOfIngredientsNotRecommended = 0;
    let ingredientsNotEat = [];
    let ingredientsNotEatUnique;

    for (const nutrientDetail of nutrients_details) {
      if (
        !nutrientDetail ||
        !nutrientDetail.name ||
        !Array.isArray(nutrientDetail.name)
      ) {
        continue;
      }

      for (const nameElement of nutrientDetail.name) {
        if (!nameElement) {
          continue;
        }

        const ingredientFound = await NoDiabetic.findOne({
          name: { $regex: new RegExp(nameElement, "i") },
        });

        if (ingredientFound) {
          ingredientsNotEat.push(ingredientFound.name);
        }
      }
      ingredientsNotEatUnique = Array.from(new Set(ingredientsNotEat));
    }

    res.status(200).json({
      count: ingredientsNotEatUnique.length,
      ingredients: ingredientsNotEatUnique.length > 2 ? ingredientsNotEatUnique.slice(0, 2): ingredientsNotEatUnique
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
// Get the composition of pro, fat, carb, fiber
//------------------------------------------------------------
router.get("/get-top4-nutrients", async (req, res) => {
  try {
    if (nutrients_details.length === 0) {
      return res.status(404).json({ error: "No nutrients found" });
    }

    let proteinSum = 0;
    let fatsSum = 0;
    let fiberSum = 0;
    let carbsSum = 0;

    for (const nutrient of nutrients_details) {
      if (nutrient) {
        proteinSum += parseFloat(nutrient.protein) || 0;
        fatsSum += parseFloat(nutrient.total_fat) || 0;
        fiberSum += parseFloat(nutrient.fiber) || 0;
        carbsSum += parseFloat(nutrient.carbohydrate) || 0;
      } else {
        console.log(`Nutrient not found in the database: ${nutrient}`);
      }
    }

    const totalSum = proteinSum + fatsSum + fiberSum + carbsSum;
    const weightedContribution = {
      protein: Math.round((proteinSum / totalSum) * 100),
      fats: Math.round((fatsSum / totalSum) * 100),
      fiber: Math.round((fiberSum / totalSum) * 100),
      carbs: Math.round((carbsSum / totalSum) * 100),
    };

    const adjustment =
      100 -
      (weightedContribution.protein +
        weightedContribution.fats +
        weightedContribution.fiber +
        weightedContribution.carbs);
    weightedContribution.protein += adjustment;

    res.status(200).json(weightedContribution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------
// Getting the nutrients
//------------------------------------------------------------
router.get("/get-nutrients", async (req, res) => {
  try {
    if (nutrients.length === 0) {
      return res.status(404).json({ error: "No nutrients found" });
    }

    const top6 = [];
    for (const nutrient of nutrients) {
      const cleanedNutrient = nutrient.replace(/[^A-Za-z\s]/g, "");
      const nutrientParts = cleanedNutrient.split(" ");
      const regexConditions = nutrientParts.map((part) => ({
        name: { $regex: new RegExp(part, "i") },
      }));

      const foundNutrient = await Food.findOne({ $or: regexConditions });

      if (foundNutrient) {
        nutrients_details.push(foundNutrient);
      } else {
        console.log(`Nutrient not found in the database: ${cleanedNutrient}`);
      }
    }

    res
      .status(200)
      .json(
        nutrients_details.slice(
          0,
          nutrients_details.length >= 6 ? 6 : nutrients_details
        )
      );
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
    const noutput = output.map((element) => element.replace(/\r/g, ""));
    const errorOutput = stderr.split("\n").filter(Boolean);
    nutrients = noutput;
    res.json({ noutput, errorOutput });
  });
});
module.exports = router;
