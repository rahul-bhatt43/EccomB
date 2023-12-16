const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config();

app.get('/', (req, res) => {
    res.send("Working...")
})

const dbConnect = require('./database/dbConnect');

dbConnect();

const eccom = require('./routes/eccom')

app.use('/api/v1',eccom)

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})
