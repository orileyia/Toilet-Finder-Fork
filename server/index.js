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


mongoose.connect('mongodb://localhost:27017/toilet-finder', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your-secret-key';


// Define the Toilet Schema
const ToiletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  price: { type: Number, required: true }, // Use 0 for free
  image: { type: String, required: true },
  coordinates: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Toilet = mongoose.model('Toilet', ToiletSchema);


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

// Create a new toilet
app.post('/api/toilets', verifyToken, async (req, res) => {
  try {
    const { name, address, stars, price, image, coordinates } = req.body;
    const newToilet = new Toilet({
      name,
      address,
      stars,
      price,
      image,
      coordinates,
      creatorId: req.userId,
    });
    await newToilet.save();
    res.status(201).send(newToilet);
  } catch (error) {
    res.status(500).send({ message: 'Error creating toilet', error: error.message });
  }
});

// Get all toilets
app.get('/api/toilets', async (req, res) => {
  try {
    const toilets = await Toilet.find();
    res.status(200).send(toilets);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching toilets', error: error.message });
  }
});

// Get a single toilet by ID
app.get('/api/toilets/:id', async (req, res) => {
  try {
    const toilet = await Toilet.findById(req.params.id);
    if (!toilet) return res.status(404).send({ message: 'Toilet not found' });
    res.status(200).send(toilet);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching toilet', error: error.message });
  }
});

// Update a toilet
app.put('/api/toilets/:id', verifyToken, async (req, res) => {
  try {
    const { name, address, stars, price, image, coordinates } = req.body;
    const toilet = await Toilet.findById(req.params.id);
    if (!toilet) return res.status(404).send({ message: 'Toilet not found' });
    if (toilet.creatorId.toString() !== req.userId)
      return res.status(403).send({ message: 'Unauthorized' });

    toilet.name = name || toilet.name;
    toilet.address = address || toilet.address;
    toilet.stars = stars || toilet.stars;
    toilet.price = price || toilet.price;
    toilet.image = image || toilet.image;
    toilet.coordinates = coordinates || toilet.coordinates;

    await toilet.save();
    res.status(200).send(toilet);
  } catch (error) {
    res.status(500).send({ message: 'Error updating toilet', error: error.message });
  }
});

// Delete a toilet
app.delete('/api/toilets/:id', verifyToken, async (req, res) => {
  try {
    const toilet = await Toilet.findById(req.params.id);
    if (!toilet) return res.status(404).send({ message: 'Toilet not found' });
    if (toilet.creatorId.toString() !== req.userId)
      return res.status(403).send({ message: 'Unauthorized' });

    await Toilet.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Toilet deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting toilet', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
