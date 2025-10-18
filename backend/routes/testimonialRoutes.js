const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonial);

// Protected routes
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;