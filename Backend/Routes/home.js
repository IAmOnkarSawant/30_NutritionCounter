const express = require('express')
const Questions = require('../Models/questionsModel')
const UserDet = require('../Models/userModel')
const requireAuth = require('../Middleware/requireAuth')
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

const router = express.Router()

// router.use(requireAuth)

// get questions
router.get('/', async (req, res) => {
  try {
    const questions = await Questions.find({}).sort({ questionNumber: 1 }); 
    
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Set the upload directory
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Serve uploaded files as static content
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file upload
router.post('/upload', upload.single('image'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access information about the uploaded file
  const uploadedFile = req.file;
  const filePath = uploadedFile.path; 
  res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
});

    
module.exports = router;