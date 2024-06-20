const express = require('express');
const JobAppRecord = require('../models/JobAppRecord');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/records', auth, async (req, res) => {
  const { title, company, dateApplied, status } = req.body;
  try {
    const newApplication = new JobAppRecord({
      title,
      company,
      dateApplied,
      status,
      user: req.user.id,
    });

    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/records', auth, async (req, res) => {
  try {
    const applications = await JobAppRecord.find({ user: req.user.id });
    res.json(applications);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;