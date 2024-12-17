const express = require('express');
const app = express();
const port = 3001;
const { authenticate, authorizeAdmin } = require('./middlewares/auth');

app.use(express.json());

// Flight verilerini tutmak için basit bir dizi
let flights = [];

// Admin: Yeni uçuş ekleme
app.post('/admin/flights', authenticate, authorizeAdmin, (req, res) => {
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

// Admin: Kapasiteye göre uçuşları listeleme
app.get('/admin/flights/capacity', authenticate, authorizeAdmin, (req, res) => {
    const { capacity } = req.query;

    if (!capacity) {
        return res.status(400).json({ message: 'Missing required parameter: capacity' });
    }

    const filteredFlights = flights.filter(flight => flight.capacity >= parseInt(capacity));
    res.status(200).json({ flights: filteredFlights });
});

// Uygulamayı başlat
app.listen(port, () => {
    console.log(`Service A running on port ${port}`);
});
