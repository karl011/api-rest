const express = require('express');
const db = require('./routes/dbConfig');
const usersRoutes = require('./routes/users');
const schoolsRoutes = require('./routes/school');

const app = express();
const port = 3001;

console.log('Connecté à la base de données MySQL');

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Utilisation des routes pour les utilisateurs et les écoles
app.use('/api/users', usersRoutes);
app.use('/api/school', schoolsRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
