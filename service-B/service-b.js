const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3002;

app.use(express.json());

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

app.post('/auth/login', (req, res) => {
    console.log('Received POST /auth/login request');
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ token });
});

app.listen(port, () => {
    console.log(`Service B running on port ${port}`);
});
