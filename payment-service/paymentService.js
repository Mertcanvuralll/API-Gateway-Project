const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const PAYMENT_QUEUE = 'paymentQueue';

async function sendToQueue(data) {
    const connection = await amqp.connect('amqp://rabbitmq'); // RabbitMQ Host adı: rabbitmq
    const channel = await connection.createChannel();
    await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    channel.sendToQueue(PAYMENT_QUEUE, Buffer.from(JSON.stringify(data)));
    console.log('Message sent to Payment Queue:', data);
    await channel.close();
    await connection.close();
}

app.post('/make-payment', async (req, res) => {
    try {
        const paymentData = req.body;
        await sendToQueue(paymentData);
        res.status(200).json({ message: 'Payment request sent to queue' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error sending payment' });
    }
});

app.listen(3004, () => console.log('Payment Service running on port 3004'));
