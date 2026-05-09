const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Render uses process.env.PORT, local uses 5000
const PORT = process.env.PORT || 5000;

app.use(cors());

// This line allows the frontend to access your ROMs, Images, and Custom Game folders
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set up the Dynamic Base URL for production vs local development
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// --- GAME DATABASE ---
const games = [
    {
        id: "1",
        title: "Super Tilt Bro (NES)",
        system: "nes", 
        imageUrl: `${BASE_URL}/static/images/test.jpg`,
        romUrl: `${BASE_URL}/static/roms/test.nes`,
        isCustom: false
    },
    {
        id: "custom-001",
        title: "My First JS Game",
        system: "custom", // We use 'custom' to skip the emulator in React
        imageUrl: `${BASE_URL}/static/images/snake.jpg`,
        // This points to the folder we created in the public directory
        gameUrl: `${BASE_URL}/static/my-game/index.html`, 
        isCustom: true
    }
];

// --- API ROUTES ---

// Get all games
app.get('/api/games', (req, res) => {
    res.json(games);
});

// Basic Health Check (To avoid the "Cannot GET /" error)
app.get('/', (req, res) => {
    res.send('Arcade Server is Running!');
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`
    🕹️  Server is live!
    🏠  Local: http://localhost:${PORT}
    📡  API:   ${BASE_URL}/api/games
    `);
});