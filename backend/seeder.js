const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Product = require('./models/Product');
const User = require('./models/User')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read JSON files
const product = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);
const user = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
    try {
    await Product.create(product);
    await User.create(user)

    console.log('Data Imported...'.green.inverse);
    process.exit();
    } catch (err) {
    console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
    await Product.deleteMany();
    await User.deleteMany()

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
    } catch (err) {
    console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}