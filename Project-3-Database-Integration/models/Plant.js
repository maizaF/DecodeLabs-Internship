const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Plant name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['succulent', 'foliage', 'herb', 'flowering'],
        lowercase: true
    },
    neighborhood: {
        type: String,
        required: [true, 'Neighborhood is required'],
        trim: true
    },
    distance: {
        type: Number,
        default: function() {
            return parseFloat((Math.random() * 4.5 + 0.5).toFixed(1));
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    care: {
        type: String,
        default: 'Not specified'
    },
    size: {
        type: String,
        default: 'Not specified',
        enum: ['Small', 'Medium', 'Large', 'Seedling', 'Not specified']
    },
    image: {
        type: String,
        default: null
    },
    posted: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

PlantSchema.index({ category: 1, neighborhood: 1 });

module.exports = mongoose.model('Plant', PlantSchema);
