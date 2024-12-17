const amqp = require('amqplib');

const PAYMENT_QUEUE = 'paymentQueue';
const NOTIFICATION_QUEUE = 'notificationQueue';

async function processPayment() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    console.log('Waiting for Payment Queue messages...');

    channel.consume(PAYMENT_QUEUE, (msg) => {
        if (msg !== null) {
            const payment = JSON.parse(msg.content.toString());
            console.log('Processing payment:', payment);

            // Send to Notification Queue
            const notification = {
                user: payment.user,
                message: 'Payment processed successfully!'
            };
            channel.sendToQueue(NOTIFICATION_QUEUE, Buffer.from(JSON.stringify(notification)));

            console.log('Sent to Notification Queue:', notification);
            channel.ack(msg);
        }
    });
}

processPayment();
