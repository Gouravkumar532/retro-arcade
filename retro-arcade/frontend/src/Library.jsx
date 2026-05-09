import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Library() {
  const [games, setGames] = useState([]);

    useEffect(() => {
    // Update this line with your EXACT Render URL
    axios.get('https://retro-arcade-xd1l.onrender.com/api/games')
        .then(response => setGames(response.data))
        .catch(error => console.error("Error fetching games:", error));
    }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>🕹️ My Retro Arcade</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {games.map(game => (
          <div key={game.id} style={{ border: '2px solid #333', padding: '15px', borderRadius: '10px', backgroundColor: '#222' }}>
            {/* The image is loaded directly from your Node server's public folder */}
            <img src={game.imageUrl} alt={game.title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <h3 style={{ margin: '10px 0' }}>{game.title}</h3>
            
            {/* When clicked, pass the game data to the player page */}
            <Link to={`/play/${game.id}`} state={{ game }}>
              <button style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#00ffcc', border: 'none', fontWeight: 'bold' }}>
                Play Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;