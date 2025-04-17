/*
  Name: Shreya Jayas
  Date: 04.17.2025
  CSC 372-01

  This file defines all the routes/endpoints for joke-related actions in the Jokebook project.
  It links each route with corresponding controller functions.
*/


const express = require('express');
const router = express.Router();
const controller = require('../controllers/jokeController');

// ✅ Get all available joke categories
router.get('/jokebook/categories', controller.getCategories);

// ✅ Get jokes by category (from local DB or fetch from JokeAPI if not found)
router.get('/jokebook/joke/:category', controller.getJokesByCategory);

// ✅ Get one random joke from local DB
router.get('/jokebook/random', controller.getRandomJoke);

// ✅ Add a new joke manually
router.post('/jokebook/joke/add', controller.addJoke);

module.exports = router;
