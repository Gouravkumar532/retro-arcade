const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Render will automatically set process.env.PORT when hosted. 
// Locally, it will fall back to 5000.
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve your ROMs and Images
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set up the dynamic Base URL
// If hosted on Render, it uses the live URL. If on your computer, it uses localhost.
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// The Database (Just your 1 NES game)
const games = [
    {
        id: "1",
        title: "Test Game (NES)",
        system: "nes", 
        // Notice we are using backticks ` ` instead of quotes ' ' here!
        imageUrl: `${BASE_URL}/static/images/test.jpg`,
        romUrl: `${BASE_URL}/static/roms/test.nes`
    }
];

// Send the games to React
app.get('/api/games', (req, res) => {
    res.json(games);
});

app.listen(PORT, () => {
    console.log(`🕹️ Arcade backend is running on port ${PORT}`);
});