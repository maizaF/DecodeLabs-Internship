// server.js — Main entry point

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const plantRoutes = require('./routes/plants');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Logging middleware (for debugging)
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/plants', plantRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: '🌱 Verdant Circle API',
        version: '1.0.0',
        endpoints: {
            'GET /api/plants': 'Get all plants',
            'GET /api/plants/:id': 'Get a single plant',
            'POST /api/plants': 'Add a new plant',
            'DELETE /api/plants/:id': 'Delete a plant',
            'PUT /api/plants/:id': 'Update a plant'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.url}`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
