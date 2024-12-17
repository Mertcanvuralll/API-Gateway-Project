const express = require('express');
const app = express();
const port = 3001;
const { authenticate, authorizeAdmin } = require('./middlewares/auth');

app.use(express.json());

// A simple array to store flight data
let flights = [];

// Admin: Add new flight
app.post('/admin/flights', authenticate, authorizeAdmin, (req, res) => {
    console.log('Received POST /admin/flights request');
    const { from, to, dateRange, days, capacity } = req.body;

    if (!from || !to || !dateRange || !days || !capacity) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    const newFlight = {
        id: flights.length + 1,
        from,
        to,
        dateRange,
        days,
        capacity
    };

    flights.push(newFlight);

    res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
});

// Admin: List flights by capacity
app.get('/admin/flights/capacity', authenticate, authorizeAdmin, (req, res) => {
    console.log('Received GET /admin/flights/capacity request');
    const { capacity } = req.query;

    if (!capacity) {
        return res.status(400).json({ message: 'Missing required parameter: capacity' });
    }

    const filteredFlights = flights.filter(flight => flight.capacity >= parseInt(capacity));
    res.status(200).json({ flights: filteredFlights });
});

// Start the application
app.listen(port, () => {
    console.log(`Service A running on port ${port}`);
});
