const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const serverless = require('serverless-http');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const JobAppRecord = require('./models/JobAppRecord');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(express.json());

//Connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connection open');
})
.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});

function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      console.log('req.user', user);
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Auth Routes
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
    
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});
  
app.post('/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });
  
      user = new User({ name, email, password: await bcrypt.hash(password, 10) });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Application Routes
//Save a new job record
app.post('/api/applications', authMiddleware, async (req, res) => {
    const { title, companyName, salary, description, link, status } = req.body;
    try {
      const newApplication = new JobAppRecord({
        title,
        companyName,
        salary, 
        description, 
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
app.get('/applications', authMiddleware, async (req, res) => {
    try {
      const applications = await JobAppRecord.find({ user: req.user._id });
      return res.status(200).json(applications);
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
});

// Update the record with a new status
app.patch('/api/applications/:id', authMiddleware, async (req, res) => {
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
app.delete('/api/applications/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const application = await JobAppRecord.findOneAndDelete({ _id: id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    return res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});



if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  
module.exports.handler = serverless(app);
