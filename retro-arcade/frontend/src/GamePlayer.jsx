import { useLocation, Link } from 'react-router-dom';

function GamePlayer() {
  const location = useLocation();
  const game = location.state?.game;

  // Safety check if someone navigates to this URL directly without clicking a game
  if (!game) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
        <h2>Game not found</h2>
        <Link to="/" style={{ color: '#00ffcc' }}>Return to Library</Link>
      </div>
    );
  }

  /** 
   * LOGIC SWITCH:
   * 1. If system is 'custom', we load your JS game directly from your server.
   * 2. Otherwise, we load 'emulator.html' and pass it the ROM info.
   */
  const isCustom = game.system === 'custom';

   // Use the gameUrl exactly as it comes from the backend (which includes the Render link)
   const iframeSrc = isCustom 
   ? game.gameUrl 
    : `/emulator.html?core=${game.system}&rom=${encodeURIComponent(game.romUrl)}`;

  return (
    <div style={{ 
      background: '#111', 
      color: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '20px' 
    }}>
      {/* Header Area */}
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '15px' }}>
        <Link to="/" style={{ color: '#00ffcc', textDecoration: 'none' }}>← Back to Library</Link>
        <h1 style={{ fontSize: '24px', marginTop: '10px' }}>
            {isCustom ? "🚀 Playing Custom Build: " : "🕹️ Now Playing: "} {game.title}
        </h1>
      </div>

      {/* The Game Frame */}
      <div style={{ 
        width: '800px', 
        height: '600px', 
        backgroundColor: 'black', 
        border: '5px solid #333', 
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,255,204,0.2)' 
      }}>
        <iframe 
          src={iframeSrc}
          width="100%" 
          height="100%" 
          frameBorder="0"
          allowFullScreen
          title={game.title}
        ></iframe>
      </div>

      {/* Helpful Hint */}
      <p style={{ marginTop: '20px', color: '#888', fontSize: '14px' }}>
        {isCustom 
          ? "This is a native JavaScript game running on your Node server." 
          : "Running via EmulatorJS (WebAssembly). Check your console for controls."}
      </p>
    </div>
  );
}

export default GamePlayer;