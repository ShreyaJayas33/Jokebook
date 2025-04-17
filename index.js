const express = require('express');
const cors = require('cors'); // ✅ Import cors

const app = express();
const jokeRoutes = require('./routes/jokeRoutes');
const PORT = 3000;

// ✅ Enable CORS for requests from other origins (like React on 3001)
app.use(cors());

// Serve static files from public/
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use('/', jokeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
