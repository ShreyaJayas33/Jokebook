/*
  Name: Shreya Jayas
  Date: 04.17.2025
  CSC 372-01

  This controller file manages all joke-related requests, such as fetching categories, fetching jokes by category,
  handling random joke retrieval, and adding new jokes to the database.
*/


const model = require('../models/jokeModel');
const axios = require('axios');

exports.getCategories = (req, res) => {
  const categories = model.getCategories();
  res.json(categories);
};

exports.getJokesByCategory = async (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;
  const categories = model.getCategories();

  if (categories.includes(category)) {
    model.getJokesByCategory(category, limit, (err, jokes) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(jokes);
    });
  } else {
    try {
      const apiUrl = `https://v2.jokeapi.dev/joke/${category}?amount=3&type=twopart&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
      const response = await axios.get(apiUrl);
      const jokes = response.data?.jokes || [];

      if (!jokes.length) {
        return res.status(404).json({ error: 'No jokes found for this category from external source.' });
      }

      for (let joke of jokes) {
        if (joke.type === 'twopart') {
          await new Promise((resolve, reject) => {
            model.addJoke(category, joke.setup, joke.delivery, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      }

      model.getJokesByCategory(category, limit, (err, localJokes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(localJokes);
      });

    } catch (err) {
      console.error('Error fetching from external API:', err.message);
      res.status(500).json({ error: 'Failed to fetch jokes for new category.' });
    }
  }
};

exports.getRandomJoke = (req, res) => {
  model.getRandomJoke((err, joke) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(joke);
  });
};

exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  const categories = model.getCategories();

  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!categories.includes(category)) {
    categories.push(category);
  }

  model.addJoke(category, setup, delivery, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    model.getJokesByCategory(category, null, (err, jokes) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(jokes);
    });
  });
};
