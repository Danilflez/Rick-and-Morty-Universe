import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ImageBar from './components/ImageBar/ImageBar';
import Body from './components/Body/Body';
import CharacterDetail from './components/CharacterDetail/CharacterDetail';
import FavoritesPage from './components/FavoretesPage/FavoretesPage';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Router basename="/Rick-and-Morty-Universe">
      <div className="App">
        <Header onSearch={setSearchTerm} />
        <ImageBar />
        <Routes>
          <Route path="/" element={<Body searchTerm={searchTerm} />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<FavoritesPage searchTerm={searchTerm} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
