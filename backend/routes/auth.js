const express = require('express');
const bcrypt = require('bcrypt'); // Pentru hashing-ul parolei
const jwt = require('jsonwebtoken'); // Pentru generarea token-urilor JWT
const pool = require('../config/db'); // Conexiunea la baza de date
const router = express.Router();

// Register - Înregistrarea unui utilizator nou
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificăm dacă utilizatorul există deja
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash parola
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserăm utilizatorul în baza de date
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );

        // Returnăm utilizatorul creat
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login - Autentificarea unui utilizator
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Găsim utilizatorul în baza de date
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verificăm parola introdusă față de parola hashată
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generăm token JWT
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Returnăm token-ul și datele utilizatorului
        res.json({ token, user: { id: user.rows[0].id, email: user.rows[0].email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
