// routes/plants.js

const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plantsController');

// GET all plants (with optional category filter)
router.get('/', plantsController.getAllPlants);

// GET a single plant by ID
router.get('/:id', plantsController.getPlantById);

// POST a new plant
router.post('/', plantsController.createPlant);

// DELETE a plant
router.delete('/:id', plantsController.deletePlant);

// PUT - Update a plant
router.put('/:id', plantsController.updatePlant);

module.exports = router;