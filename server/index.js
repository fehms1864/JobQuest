const express = require('express');
const serverless = require('serverless-http');

const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

app.get('/.well-known/pki-validation/E8F060FE1532B446A56745B89BAF711F.txt', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=E8F060FE1532B446A56745B89BAF711F.txt');
  res.sendFile(path.join(__dirname, '.well-known', 'pki-validation', 'E8F060FE1532B446A56745B89BAF711F.txt'));
});

//routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const applicationRoutes = require('./routes/records');

// Use routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/applications', applicationRoutes);

//Connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connection open');
})
.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Serving static files from:', path.join(__dirname, '.well-known'));
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  
module.exports.handler = serverless(app);
