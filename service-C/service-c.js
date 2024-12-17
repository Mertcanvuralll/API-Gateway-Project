const express = require('express');
const app = express();
const port = 3003;

app.use(express.json());

// GET /mobile/flights - Query flights with paging
app.get('/mobile/flights', (req, res) => {
    console.log('Received GET /mobile/flights request');
    const { from, to, dateRange, offset = 0, limit = 10 } = req.query;

    // Check: Are required parameters missing?
    if (!from || !to || !dateRange) {
        return res.status(400).json({ message: 'Missing required parameters: from, to, or dateRange' });
    }

    // We will add business logic here when the real data source is connected.
    // For now, we return an empty array as the response.
    res.status(200).json({
        total: 0, // You can make this value dynamic when you have a data source
        flights: [] // Currently, an empty array is being returned
    });
});

// POST /tickets - Buy a ticket
app.post('/tickets', (req, res) => {
    console.log('Received POST /tickets request');
    const { flightId, passengerName } = req.body;

    if (!flightId || !passengerName) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    res.status(201).json({
        message: 'Ticket purchased successfully',
        ticket: { id: 1, flightId, passengerName }
    });
});

// POST /tickets/checkin - Check-in for a flight
app.post('/tickets/checkin', (req, res) => {
    console.log('Received POST /tickets/checkin request');
    const { ticketId } = req.body;

    if (!ticketId) {
        return res.status(400).json({ message: 'Missing required parameter: ticketId' });
    }

    res.status(200).json({
        message: 'Check-in successful',
        ticketId
    });
});

// Start the service
app.listen(port, () => {
    console.log(`Service C running on port ${port}`);
});
