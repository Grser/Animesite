const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que el modelo User esté correctamente importado
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generar un token JWT
        const token = jwt.sign({ id: newUser.id }, 'pancoqueso', { expiresIn: '1h' });

        // Enviar el token como una cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        res.status(500).json({ error: 'Error registering user: ' + err.message });
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

module.exports = router;
