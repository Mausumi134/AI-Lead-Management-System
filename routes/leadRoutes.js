const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const SalesRep = require('../models/SalesRep');
const emailValidator = require('email-validator');
const natural = require('natural');
const { body, validationResult } = require('express-validator');

// Initialize Sentiment Analyzer
const SentimentAnalyzer = natural.SentimentAnalyzer;
const analyzer = new SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// 📌 Sentiment Analysis Function
const analyzeSentiment = (text) => {
  if (!text) return 'Neutral';
  const score = analyzer.getSentiment(text.split(' '));
  return score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
};

// 📌 Lead Scoring Function
const calculateScore = (name, email, phone, source) => {
  let score = 0;
  if (emailValidator.validate(email)) score += 30;
  if (phone.length === 10 && !isNaN(phone)) score += 20;
  score += source.toLowerCase() === 'website' ? 40 : source.toLowerCase() === 'referral' ? 50 : 10;
  return score;
};

// 📌 AI-powered Lead Assignment
const assignLeadToSalesRep = async (lead) => {
  try {
    const availableReps = await SalesRep.find().sort({ assignedLeads: 1 });
    if (availableReps.length === 0) return null;

    const selectedRep = lead.score >= 80
      ? availableReps.find(rep => rep.assignedLeads <= 5) || availableReps[0]
      : availableReps[0];

    lead.assignedTo = selectedRep._id;
    await lead.save();
    await SalesRep.updateOne({ _id: selectedRep._id }, { $inc: { assignedLeads: 1 } });

    return selectedRep;
  } catch (error) {
    console.error('Error assigning lead:', error.message);
    return null;
  }
};

// 📌 Capture a Lead (POST API)
router.post('/leads', [
  body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
  body('source').isIn(['Website', 'Email', 'Social Media', 'Referral', 'Other']).withMessage('Invalid source'),
  body('comments').optional().isString().isLength({ max: 500 }).withMessage('Comments cannot exceed 500 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, source, comments } = req.body;

  try {
    const existingLead = await Lead.findOne({ $or: [{ email }, { phone }] });
    if (existingLead) {
      return res.status(400).json({ message: 'Duplicate lead detected', lead: existingLead });
    }

    const score = calculateScore(name, email, phone, source);
    const sentiment = analyzeSentiment(comments);

    const lead = new Lead({ name, email, phone, source, score, comments, sentiment });
    await lead.save();

    const assignedRep = await assignLeadToSalesRep(lead);

    if (assignedRep) {
      res.status(201).json({ message: `Lead captured, scored, and assigned to ${assignedRep.name}`, lead });
    } else {
      res.status(201).json({ message: 'Lead captured but not assigned to any rep.', lead });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get All Leads (GET API)
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get Assigned Leads (GET API)
router.get('/assigned-leads', async (req, res) => {
  try {
    const assignedLeads = await Lead.find({ assignedTo: { $ne: null } }).populate('assignedTo', 'name email');
    res.status(200).json(assignedLeads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Add a Sales Representative (POST API)
router.post('/salesreps', async (req, res) => {
  const { name, email } = req.body;
  try {
    const rep = new SalesRep({ name, email });
    await rep.save();
    res.status(201).json({ message: 'Sales rep added successfully', rep });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get All Sales Representatives (GET API)
router.get('/salesreps', async (req, res) => {
  try {
    const reps = await SalesRep.find();
    res.status(200).json(reps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  

module.exports = router;
