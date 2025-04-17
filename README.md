# Jokebook 🃏

This is a full-stack web application built with **Node.js**, **Express**, **SQLite**, and **React**. It allows users to:
- View a random joke
- Browse or search for jokes by category
- Add new jokes to the database
- 💡 **Extra Credit**: Fetch new categories from an external joke API (JokeAPI)

---

## 📦 Project Structure

/Jokebook
├── client/               ← React frontend
├── controllers/
├── db/
├── models/
├── routes/
├── index.js              ← Express backend entry point (must be at root)
├── package.json
└── .gitignore

---

## 🧠 How to Run the App

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/Jokebook.git
cd Jokebook

2. Install backend dependencies

npm install
3. Enable CORS (required for frontend-backend communication)
Install cors in the backend to allow requests from React:

bash
Copy
Edit
npm install cors
In index.js, include this:

js
Copy
Edit
const cors = require('cors');
app.use(cors());
✅ Even if someone downloads the project, they must run npm install cors unless it's already installed via package.json.

4. Install frontend dependencies
bash
Copy
Edit
cd client
npm install
5. Run the app in two terminals
Terminal 1: Start backend (in root folder)
bash
Copy
Edit
npm start
This launches the Express server at http://localhost:3000.

Terminal 2: Start frontend (inside /client folder)
bash
Copy
Edit
cd client
npm start
React will auto-run on http://localhost:3001 if 3000 is taken.

6. Visit the app in your browser
arduino
Copy
Edit
http://localhost:3001
🧹 Notes
node_modules/ folders are excluded using .gitignore

Both client/ and backend require npm install

Both npm start commands must be run in separate terminals

🌟 Extra Credit Feature: JokeAPI Integration
If a user searches for a category that doesn't exist in the local database:

The app calls the JokeAPI:
https://v2.jokeapi.dev/joke/{category}?amount=3&type=twopart&blacklistFlags=nsfw,religious,political,racist,sexist,explicit

If found, it saves those jokes under a new category in the local SQLite database.

The new jokes display immediately in the app.

Axios was used to fetch jokes from the external API:

bash
Copy
Edit
npm install axios
✅ Author
Built by [Your Name]
Submitted for [Course Name / Instructor]
Spring 2025

yaml
Copy
Edit

---

Let me know when you’re ready and I’ll walk you step-by-step through pushing this to GitHub (with `.gitignore` setup)! ✅







