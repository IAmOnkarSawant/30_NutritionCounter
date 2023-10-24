const express = require('express')
const Questions = require('../Models/questionsModel')
const UserDet = require('../Models/userModel')
const requireAuth = require('../Middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

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

    
module.exports = router;