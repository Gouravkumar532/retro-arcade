import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from './Library';
import GamePlayer from './GamePlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/play/:id" element={<GamePlayer />} />
      </Routes>
    </Router>
  );
}

export default App;