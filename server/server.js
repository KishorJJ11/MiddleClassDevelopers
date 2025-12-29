const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Path: ${req.path} | Method: ${req.method}`);
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/contact', require('./routes/contact'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/projects', require('./routes/project'));

app.get('/', (req, res) => {
    res.send('MCDevs API Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
