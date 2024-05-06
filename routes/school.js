const { db } = require('./dbConfig');
const express = require('express');
const School = require('../models/School');

const router = express.Router();

// Exemple de route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Exemple de route pour récupérer un utilisateur par son ID
router.get('/:id', async (req, res) => {
  const schoolId = req.params.id;
  try {
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).send('Ecole non trouvée');
    }
    res.json(school);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'école : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Création (Create) : Ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
  const { code, nom, localisation} = req.body;
  try {
    await School.create(code, nom, localisation);
    res.send('Ecole ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'école : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Mise à jour (Update) : Mettre à jour un utilisateur existant
router.put('/:id', async (req, res) => {
  const { code, nom, localisation} = req.body;
  const schoolId = req.params.id;
  try {
    await School.update(schoolId, code, nom, localisation);
    res.send('Ecole mise à jour avec succès');
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'école : ', err);
    res.status(500).send('Erreur serveur');
  }
});

// Suppression (Delete) : Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const schoolId = req.params.id;
  try {
    await School.delete(schoolId);
    res.send('Ecole supprimée avec succès');
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'école : ', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
  