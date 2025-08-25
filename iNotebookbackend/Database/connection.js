const mongoose = require('mongoose');
const url = process.env.URL;

const connect_to_mongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("connection database successfullyv . . .")
    } catch (error) {
        console.log(`Error in db: ${error}`);
    }
}

module.exports = connect_to_mongo; 