const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL);

        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Issue in Connection to DB");
        console.error(error.message);
        process.exit(1);
    }
}


module.exports = dbConnect;