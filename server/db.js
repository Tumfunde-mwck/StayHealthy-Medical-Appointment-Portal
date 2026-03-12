const mongoose = require('mongoose');

// Using the local address since we will use the host network trick
const mongoURI = "mongodb://root:1onTvzka8oAWBH8hrdGF5eK1@172.21.180.5:27017/stayhealthy?authSource=admin";

const connectToMongo = async (retryCount = 0) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Mongo Connection Error:", error.message);
        if (retryCount < 3) {
            console.log(`Retrying, retry count: ${retryCount + 1}`);
            setTimeout(() => connectToMongo(retryCount + 1), 2000);
        } else {
            throw new Error('Unable to connect to Mongo!');
        }
    }
};

module.exports = connectToMongo;