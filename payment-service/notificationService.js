const amqp = require('amqplib');
const nodemailer = require('nodemailer');

const NOTIFICATION_QUEUE = 'notificationQueue';

// E-posta Gönderim Ayarları
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

async function sendNotification() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    console.log('Waiting for Notification Queue messages...');

    channel.consume(NOTIFICATION_QUEUE, (msg) => {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            console.log('Sending email to:', notification.user);

            const mailOptions = {
                from: 'your-email@gmail.com',
                to: notification.user,
                subject: 'Payment Notification',
                text: notification.message
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            channel.ack(msg);
        }
    });
}

sendNotification();
