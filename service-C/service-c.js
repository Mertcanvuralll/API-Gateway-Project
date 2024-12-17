const express = require('express');
const app = express();
const port = 3003;

app.use(express.json());

// GET /mobile/flights - Query flights with paging
app.get('/mobile/flights', (req, res) => {
    const { from, to, dateRange, offset = 0, limit = 10 } = req.query;

    // Kontrol: Gerekli parametreler eksik mi?
    if (!from || !to || !dateRange) {
        return res.status(400).json({ message: 'Missing required parameters: from, to, or dateRange' });
    }

    // Gerçek veri kaynağı bağlandığında buraya iş mantığı ekleyeceğiz.
    // Şimdilik yanıtı boş bir dizi döndürüyoruz.
    res.status(200).json({
        total: 0, // Veri kaynağınız olduğunda bu değeri dinamik yapabilirsiniz
        flights: [] // Şu anda boş bir dizi döndürülüyor
    });
});

// POST /tickets - Buy a ticket
app.post('/tickets', (req, res) => {
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
    const { ticketId } = req.body;

    if (!ticketId) {
        return res.status(400).json({ message: 'Missing required parameter: ticketId' });
    }

    res.status(200).json({
        message: 'Check-in successful',
        ticketId
    });
});

// Service'i başlat
app.listen(port, () => {
    console.log(`Service C running on port ${port}`);
});
