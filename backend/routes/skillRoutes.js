// backend/routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSkills, createSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.post('/', protect, createSkill);

module.exports = router;