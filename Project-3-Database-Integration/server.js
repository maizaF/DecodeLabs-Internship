const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const plantRoutes = require('./routes/plants');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

app.use('/api/plants', plantRoutes);

app.get('/', (req, res) => {
    res.json({
        message: '🌱 Verdant Circle API',
        version: '2.0.0',
        database: 'MongoDB',
        endpoints: {
            'GET /api/plants': 'Get all plants',
            'GET /api/plants/:id': 'Get a single plant',
            'GET /api/plants?category=succulent': 'Filter by category',
            'POST /api/plants': 'Add a new plant',
            'DELETE /api/plants/:id': 'Delete a plant',
            'PUT /api/plants/:id': 'Update a plant'
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.url}`
    });
});

app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📋 Try: http://localhost:${PORT}/api/plants`);
});
