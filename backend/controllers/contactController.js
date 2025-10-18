// backend/controllers/contactController.js
const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json({ 
      message: 'Message sent successfully!',
      contact: newContact 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};