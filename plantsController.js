// controllers/plantsController.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path to data file
const dataPath = path.join(__dirname, '../data/plants.json');

// Helper: Read data from file
const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper: Write data to file
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// GET all plants
exports.getAllPlants = (req, res) => {
    try {
        const plants = readData();
        
        // Optional: Filter by category
        const { category } = req.query;
        if (category) {
            const filtered = plants.filter(p => p.category === category);
            return res.json({
                success: true,
                count: filtered.length,
                data: filtered
            });
        }

        res.json({
            success: true,
            count: plants.length,
            data: plants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch plants'
        });
    }
};

// GET a single plant by ID
exports.getPlantById = (req, res) => {
    try {
        const { id } = req.params;
        const plants = readData();
        const plant = plants.find(p => p.id === id);

        if (!plant) {
            return res.status(404).json({
                success: false,
                error: `Plant with ID ${id} not found`
            });
        }

        res.json({
            success: true,
            data: plant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch plant'
        });
    }
};

// POST - Add a new plant
exports.createPlant = (req, res) => {
    try {
        const { name, category, neighborhood, description, care, size } = req.body;

        // Validation
        const errors = [];
        if (!name || name.trim() === '') errors.push('Name is required');
        if (!category || category.trim() === '') errors.push('Category is required');
        if (!neighborhood || neighborhood.trim() === '') errors.push('Neighborhood is required');
        if (!description || description.trim() === '') errors.push('Description is required');

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }

        // Generate random distance (0.5 - 5.0 km)
        const distance = (Math.random() * 4.5 + 0.5).toFixed(1);

        const newPlant = {
            id: uuidv4(),
            name: name.trim(),
            category: category.trim(),
            neighborhood: neighborhood.trim(),
            distance: parseFloat(distance),
            description: description.trim(),
            care: care ? care.trim() : 'Not specified',
            size: size ? size.trim() : 'Not specified',
            createdAt: new Date().toISOString()
        };

        const plants = readData();
        plants.push(newPlant);
        writeData(plants);

        res.status(201).json({
            success: true,
            message: 'Plant listed successfully!',
            data: newPlant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create plant'
        });
    }
};

// DELETE a plant
exports.deletePlant = (req, res) => {
    try {
        const { id } = req.params;
        const plants = readData();
        const plantIndex = plants.findIndex(p => p.id === id);

        if (plantIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Plant with ID ${id} not found`
            });
        }

        const deletedPlant = plants.splice(plantIndex, 1)[0];
        writeData(plants);

        res.json({
            success: true,
            message: 'Plant deleted successfully!',
            data: deletedPlant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete plant'
        });
    }
};

// PUT - Update a plant
exports.updatePlant = (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, neighborhood, description, care, size } = req.body;

        const plants = readData();
        const plantIndex = plants.findIndex(p => p.id === id);

        if (plantIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Plant with ID ${id} not found`
            });
        }

        // Update only provided fields
        const updatedPlant = {
            ...plants[plantIndex],
            name: name || plants[plantIndex].name,
            category: category || plants[plantIndex].category,
            neighborhood: neighborhood || plants[plantIndex].neighborhood,
            description: description || plants[plantIndex].description,
            care: care || plants[plantIndex].care,
            size: size || plants[plantIndex].size,
            updatedAt: new Date().toISOString()
        };

        plants[plantIndex] = updatedPlant;
        writeData(plants);

        res.json({
            success: true,
            message: 'Plant updated successfully!',
            data: updatedPlant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update plant'
        });
    }
};