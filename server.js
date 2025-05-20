const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint to accept start and end locations
app.post('/api/locations', (req, res) => {
    const { startLocation, endLocation } = req.body;

    if (!startLocation || !endLocation) {
        return res.status(400).json({ error: 'Both start and end locations are required' });
    }

    // Here you can add logic to handle these locations (e.g., calculate route or store them)

    console.log('Start Location:', startLocation);
    console.log('End Location:', endLocation);

    res.json({
        message: 'Locations received successfully',
        data: {
            startLocation,
            endLocation,
        },
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
