const express = require('express');
const httpProxy = require('http-proxy');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const proxy = httpProxy.createProxyServer();

const port = 3000;

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Service URLs
const serviceAUrl = 'http://service-a:3001';
const serviceBUrl = 'http://service-b:3002';
const serviceCUrl = 'http://service-c:3003';
const paymentServiceUrl = 'http://payment-service:3004'; // Make Payment Service URL

// Service-A için yönlendirmeler
app.all('/admin/*', (req, res) => {
    console.log(`Proxying request to Service A: ${req.method} ${req.url}`);
    proxy.web(req, res, { target: serviceAUrl }, (err) => {
        console.error(`Error forwarding request to Service A: ${err.message}`);
        res.status(500).json({ error: 'Error forwarding request to Service A' });
    });
});

// Routes for Service B
app.all('/auth/*', (req, res) => {
    console.log(`Proxying request to Service B: ${req.method} ${req.url}`);
    proxy.web(req, res, { target: serviceBUrl }, (err) => {
        console.error(`Error forwarding request to Service B: ${err.message}`);
        res.status(500).json({ error: 'Error forwarding request to Service B' });
    });
});

// Routes for Service C
app.all('/mobile/*', (req, res) => {
    console.log(`Proxying request to Service C: ${req.method} ${req.url}`);
    proxy.web(req, res, { target: serviceCUrl }, (err) => {
        console.error(`Error forwarding request to Service C: ${err.message}`);
        res.status(500).json({ error: 'Error forwarding request to Service C' });
    });
});

// POST /tickets - Redirect to Service C
app.post('/tickets', (req, res) => {
    console.log(`Proxying POST /tickets to Service C`);
    proxy.web(req, res, { target: serviceCUrl }, (err) => {
        console.error(`Error forwarding POST /tickets: ${err.message}`);
        res.status(500).json({ error: 'Error forwarding POST /tickets' });
    });
});

// Routes for /tickets/checkin - Check-in for Tickets
app.post('/tickets/checkin', (req, res) => {
    console.log(`Proxying request to Service C (Ticket Check-in): ${req.method} ${req.url}`);
    proxy.web(req, res, { target: serviceCUrl }, (err) => {
        console.error(`Error forwarding request to Service C (Ticket Check-in): ${err.message}`);
        res.status(500).json({ error: 'Error forwarding request to Service C (Ticket Check-in)' });
    });
});

// POST /make-payment - Redirect to Payment Service
app.post('/make-payment', (req, res) => {
    console.log(`Proxying POST /make-payment to Payment Service`);
    proxy.web(req, res, { target: paymentServiceUrl }, (err) => {
        console.error(`Error forwarding POST /make-payment: ${err.message}`);
        res.status(500).json({ error: 'Error forwarding POST /make-payment' });
    });
});

// Start the gateway
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
