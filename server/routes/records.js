const express = require('express');
const JobAppRecord = require('../models/JobAppRecord');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

// Save a new job record
router.post('/', authMiddleware, async (req, res) => {
  const { title, companyName, salary, description, link, status } = req.body;
  try {
    const newApplication = new JobAppRecord({
      title,
      companyName,
      salary, 
      description: description != '' ? description : 'No Description', 
      link,
      dateApplied: formatDate(new Date()),
      status,
      user: req.user._id,
    });
    const application = await newApplication.save();
    return res.status(200).json(application);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

//Get the list of job records
router.get('/', authMiddleware, async (req, res) => {
  try {
    const applications = await JobAppRecord.find({ user: req.user._id });
    return res.status(200).json(applications);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update the record with a new status
router.patch('/:id', authMiddleware, async (req, res) => {
const { status } = req.body;
const { id } = req.params;

try {
  const application = await JobAppRecord.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { status },
    { new: true }
  );

  if (!application) {
    return res.status(404).json({ message: 'Job application not found' });
  }

  return res.status(200).json(application);
} catch (err) {
  return res.status(500).json({ message: 'Server error' });
}
});

// Delete the record
router.patch('/:id/delete', authMiddleware, async (req, res) => {
const { id } = req.params;
try {
  const application = await JobAppRecord.findOneAndUpdate({ _id: id, user: req.user._id }, {deleted: true}, {new: true});
  if (!application) {
    return res.status(404).json({ message: 'Job application not found' });
  }

  return res.status(200).json({ message: 'Job application deleted successfully' });
} catch (err) {
  return res.status(500).json({ message: 'Server error' });
}
});

// Restore Deleted record
router.patch('/:id/restore', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const application = await JobAppRecord.findOneAndUpdate({ _id: id, user: req.user._id }, {deleted: false}, {new: true});
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
  
    return res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
  });

module.exports = router;