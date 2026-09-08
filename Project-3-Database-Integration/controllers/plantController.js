const Plant = require('../models/Plant');

exports.getAllPlants = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};
        
        if (category) {
            filter.category = category.toLowerCase();
        }

        const plants = await Plant.find(filter).sort({ distance: 1 });

        res.json({
            success: true,
            count: plants.length,
            data: plants
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch plants'
        });
    }
};

exports.getPlantById = async (req, res) => {
    try {
        const { id } = req.params;
        const plant = await Plant.findById(id);

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
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Invalid plant ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to fetch plant'
        });
    }
};

exports.createPlant = async (req, res) => {
    try {
        const { name, category, neighborhood, description, care, size } = req.body;

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

        const newPlant = await Plant.create({
            name: name.trim(),
            category: category.trim().toLowerCase(),
            neighborhood: neighborhood.trim(),
            description: description.trim(),
            care: care ? care.trim() : 'Not specified',
            size: size ? size.trim() : 'Not specified'
        });

        res.status(201).json({
            success: true,
            message: 'Plant listed successfully!',
            data: newPlant
        });
    } catch (error) {
        console.error('Error creating plant:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to create plant'
        });
    }
};

exports.deletePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const plant = await Plant.findByIdAndDelete(id);

        if (!plant) {
            return res.status(404).json({
                success: false,
                error: `Plant with ID ${id} not found`
            });
        }

        res.json({
            success: true,
            message: 'Plant deleted successfully!',
            data: plant
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Invalid plant ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to delete plant'
        });
    }
};

exports.updatePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, neighborhood, description, care, size } = req.body;

        const updateData = {};
        if (name) updateData.name = name.trim();
        if (category) updateData.category = category.trim().toLowerCase();
        if (neighborhood) updateData.neighborhood = neighborhood.trim();
        if (description) updateData.description = description.trim();
        if (care) updateData.care = care.trim();
        if (size) updateData.size = size.trim();

        const plant = await Plant.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!plant) {
            return res.status(404).json({
                success: false,
                error: `Plant with ID ${id} not found`
            });
        }

        res.json({
            success: true,
            message: 'Plant updated successfully!',
            data: plant
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Invalid plant ID'
            });
        }
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to update plant'
        });
    }
};
