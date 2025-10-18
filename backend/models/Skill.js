// backend/models/Skill.js
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools'],
    default: 'Frontend'
  }
});

module.exports = mongoose.model('Skill', SkillSchema);