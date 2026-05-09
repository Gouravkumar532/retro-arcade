import { useLocation, Link } from 'react-router-dom';

function GamePlayer() {
  const location = useLocation();
  const game = location.state?.game; // Get the game data passed from the Library

  if (!game) return <h2 style={{ color: 'white' }}>Game not found. Go back to the library.</h2>;

  // We pass the core and rom URL to our static emulator file
  const emulatorSource = `/emulator.html?core=${game.system}&rom=${encodeURIComponent(game.romUrl)}`;

  return (
    <div style={{ background: '#111', color: 'white', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#00ffcc', textDecoration: 'none', fontSize: '18px' }}>← Back to Library</Link>
        <h2 style={{ marginTop: '10px' }}>Now Playing: {game.title}</h2>
      </div>
      
      {/* The iframe safely isolates the complex emulator code from React */}
      <div style={{ width: '800px', height: '600px', backgroundColor: 'black', border: '4px solid #333', borderRadius: '8px' }}>
        <iframe 
          src={emulatorSource}
          width="100%" 
          height="100%" 
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default GamePlayer;