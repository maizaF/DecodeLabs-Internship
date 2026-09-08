const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plant = require('./models/Plant');

dotenv.config();

const plants = [
    {
        name: "Golden Pothos",
        category: "foliage",
        neighborhood: "Riverside",
        description: "Trailing vine, low light okay. Cutting has 4 nodes.",
        care: "Low light, water when dry",
        size: "Medium"
    },
    {
        name: "Echeveria Pup",
        category: "succulent",
        neighborhood: "Maple Hill",
        description: "Rosette offset, ready to root. Needs bright light.",
        care: "Bright light, water sparingly",
        size: "Small"
    },
    {
        name: "Thai Basil",
        category: "herb",
        neighborhood: "Riverside",
        description: "Rooted cutting, very fragrant. Great for pesto.",
        care: "Full sun, keep moist",
        size: "Small"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Plant.deleteMany({});
        await Plant.insertMany(plants);
        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedDB();
