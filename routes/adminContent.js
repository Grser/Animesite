const express = require('express');
const { authenticate, authorizeAdmin } = require('../middlewares/auth'); // Asegúrate de que la ruta sea correcta
const Content = require('../models/Content');
const router = express.Router();

// Middleware de autenticación y autorización
router.use((req, res, next) => {
  if (typeof authenticate === 'function' && typeof authorizeAdmin === 'function') {
    authenticate(req, res, () => {
      authorizeAdmin(req, res, next);
    });
  } else {
    res.status(500).json({ error: 'Middleware functions not loaded correctly' });
  }
});

// Crear nuevo contenido
router.post('/create', async (req, res) => {
    const { title, description, genre, videoUrl, coverImage } = req.body;
    try {
        const newContent = await Content.create({ title, description, genre, videoUrl, coverImage });
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ error: 'Error creating content: ' + err.message });
    }
});

// Actualizar contenido existente
router.put('/edit/:id', async (req, res) => {
    const { title, description, genre, videoUrl, coverImage } = req.body;
    try {
        const content = await Content.findByPk(req.params.id);

        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }

        content.title = title || content.title;
        content.description = description || content.description;
        content.genre = genre || content.genre;
        content.videoUrl = videoUrl || content.videoUrl;
        content.coverImage = coverImage || content.coverImage;

        await content.save();
        res.json(content);
    } catch (err) {
        res.status(400).json({ error: 'Error updating content: ' + err.message });
    }
});

// Eliminar contenido
router.delete('/delete/:id', async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);

        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }

        await content.destroy();
        res.json({ message: 'Content deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error deleting content: ' + err.message });
    }
});

module.exports = router;
