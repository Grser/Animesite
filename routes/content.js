const express = require('express');
const Content = require('../models/Content');
const router = express.Router();

// Crear nuevo contenido
router.post('/', async (req, res) => {
    const { title, description, genre, videoUrl, coverImage } = req.body;
    try {
        const newContent = await Content.create({ title, description, genre, videoUrl, coverImage });
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ error: 'Error creating content: ' + err.message });
    }
});

// Obtener todo el contenido
router.get('/', async (req, res) => {
    try {
        const content = await Content.findAll();
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching content: ' + err.message });
    }
});

// Obtener un contenido por ID
router.get('/:id', async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching content: ' + err.message });
    }
});

module.exports = router;
