const { db } = require('./dbConfig');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Exemple de route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Exemple de route pour récupérer un utilisateur par son ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.json(user);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Création (Create) : Ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
  const { nom, prenom, mail, telephone, residence, sexe, schoolId } = req.body;
  try {
    await User.create(nom, prenom, mail, telephone, residence, sexe, schoolId);
    res.send('Utilisateur ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Mise à jour (Update) : Mettre à jour un utilisateur existant
router.put('/:id', async (req, res) => {
  const { nom, prenom, mail, telephone, residence, sexe, schoolId} = req.body;
  const userId = req.params.id;
  try {
    await User.update(userId, nom, prenom, mail, telephone, residence, sexe, schoolId);
    res.send('Utilisateur mis à jour avec succès');
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Suppression (Delete) : Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await User.delete(userId);
    res.send('Utilisateur supprimé avec succès');
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'utilisateur : ', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
  