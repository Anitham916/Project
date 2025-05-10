const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Initialize app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/dashboard'));
app.use('/api', require('./routes/employee'));
app.use('/api', require('./routes/project'));
app.use('/api', require('./routes/task'));
app.use('/api', require('./routes/profile'));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware (optional, for clean error messages)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
