const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
// Add this to your existing mongoose models
const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: String,
  skills: [String],
  isVerified: { type: Boolean, default: false },
});

const Profile = mongoose.model('Profile', ProfileSchema);


mongoose.connect('mongodb://localhost:27017/tasknet', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your-secret-key';

// Mongoose models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  budget: Number,
  deadline: Date,
  userId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model('User', UserSchema);
const Job = mongoose.model('Job', JobSchema);

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('Received token:', token); // Add this line
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Add this line
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    console.log('Token verified, userId:', req.userId); // Add this line
    next();
  });
};
// Add these routes to your existing routes

// Create profile
app.post('/api/profiles', verifyToken, async (req, res) => {
  try {
    const { bio, skills } = req.body;
    const newProfile = new Profile({
      userId: req.userId,
      bio,
      skills,
    });
    await newProfile.save();
    res.status(201).send(newProfile);
  } catch (error) {
    res.status(500).send({ message: 'Error creating profile', error: error.message });
  }
});

// Get profile
app.get('/api/profiles/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).send({ message: 'Profile not found' });
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching profile', error: error.message });
  }
});

// Update profile
app.put('/api/profiles', verifyToken, async (req, res) => {
  try {
    const { bio, skills } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { bio, skills },
      { new: true, upsert: true }
    );
    res.status(200).send(updatedProfile);
  } catch (error) {
    res.status(500).send({ message: 'Error updating profile', error: error.message });
  }
});

// Admin route to verify a profile
app.put('/api/profiles/:userId/verify', verifyToken, async (req, res) => {
  try {
    // Here you should add a check to ensure the user is an admin
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { isVerified: true },
      { new: true }
    );
    if (!updatedProfile) return res.status(404).send({ message: 'Profile not found' });
    res.status(200).send(updatedProfile);
  } catch (error) {
    res.status(500).send({ message: 'Error verifying profile', error: error.message });
  }
});




app.post('/api/signup', async (req, res) => {
  console.log('Received signup request:', req.body); 
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      console.log('User already exists');
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log('New user saved:', newUser); // Add this line
    const token = generateToken(newUser);
    console.log('User created, token generated:', token);
    res.status(201).send({ auth: true, token });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).send({ message: 'Error signing up', error: error.message });
  }
});


app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body); // Add this line
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Add this line
      return res.status(404).send({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password for user:', email); // Add this line
      return res.status(401).send({ auth: false, token: null });
    }
    const token = generateToken(user);
    console.log('Login successful, token generated:', token); // Add this line
    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error('Login error:', error.message); // Add this line
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

app.post('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;
    const newJob = new Job({
      title,
      description,
      category,
      budget,
      deadline,
      userId: req.userId,
    });
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send({ message: 'Error creating job', error: error.message });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching jobs', error: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send({ message: 'Job not found' });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching job', error: error.message });
  }
});

app.delete('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send({ message: 'Job not found' });
    if (job.userId.toString() !== req.userId) return res.status(403).send({ message: 'Unauthorized' });
    
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting job', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
