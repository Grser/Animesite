const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');

// Importar modelos (asegúrate de que los archivos existan)
const User = require('./models/User');
const Content = require('./models/Content');
const Favorite = require('./models/Favorite');

// Importar rutas
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const favoriteRoutes = require('./routes/favorite');
const adminContentRoutes = require('./routes/adminContent');

const app = express();

// Middleware para parsear cuerpos de petición y cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Rutas
app.get('/auth', authRoutes);
app.use('/content', contentRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/admin/content', adminContentRoutes);

// Conectar a la base de datos y sincronizar modelos
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log('Error creating database:', err));

// Ruta básica de prueba
app.get('/', (req, res) =>  {
    res.send('¡Bienvenido al sitio de anime!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
