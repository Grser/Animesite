const express = require('express');
const Favorite = require('../models/Favorite');
const Content = require('../models/Content');
const router = express.Router();

// Agregar contenido a favoritos
router.post('/', async (req, res) => {
    const { userId, contentId } = req.body;
    try {
        const favorite = await Favorite.create({ userId, contentId });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(400).json({ error: 'Error adding favorite: ' + err.message });
    }
});

// Obtener todos los favoritos de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            where: { userId: req.params.userId },
            include: Content
        });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching favorites: ' + err.message });
    }
});

module.exports = router;
