const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connectToMongo = require('./db');

console.log("1. Script started and imports finished.");

const app = express();
const PORT = process.env.PORT || 8181;

console.log("2. Connecting to Mongo...");
connectToMongo();

app.use(express.json());

app.use(cors({
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token', 'email']
}));

// Point to the 'build' folder created by 'npm run build'
const buildPath = path.resolve(__dirname, 'build');
app.use(express.static(buildPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/api/auth', require('./routes/auth'));

console.log("3. Reaching the bottom of the file...");

app.listen(PORT, () => {
    console.log(`4. SUCCESS: Server is running on port http://localhost:${PORT}`);
});