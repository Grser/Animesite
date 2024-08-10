const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookieParser = require('cookie-parser');

// Middleware para autenticar al usuario
const authenticate = (req, res, next) => {
    try {
        // Obtener el token de la cookie
        const token = req.cookies.token;

        // Si no hay token, rechazar la solicitud
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded; // Establecer el usuario decodificado en req.user

        // Continuar con la siguiente función de middleware
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized: ' + err.message });
    }
};

// Middleware para autorizar al usuario administrador
const authorizeAdmin = async (req, res, next) => {
    try {
        // Si el usuario no está autenticado, rechazar la solicitud
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findByPk(req.user.id);

        // Si el usuario no existe o no es administrador, rechazar la solicitud
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        // Si el usuario es administrador, permitir que la solicitud continúe
        next();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};

module.exports = {
    authenticate,
    authorizeAdmin
};
