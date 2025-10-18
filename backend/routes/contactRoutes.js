// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createContact);
router.get('/', protect, getAllContacts); // Protected

module.exports = router;