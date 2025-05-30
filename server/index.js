require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
   const { username, email, password } = req.body;
   const existingUser = await User.findOne({ email });
   if (existingUser) {
       return res.status(400).json({ message: 'User already exists' });
    };
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: 'User created successfully' });
});

//login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({username:user.username}, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token});
});
//authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
//dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({username: req.user.username});
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

