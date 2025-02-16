import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './CharacterCard.module.scss';

// Добавим интерфейс для уведомления
interface Notification {
  message: string;
  type: 'added' | 'removed';
}

interface Location {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  location: Location;
  species: string;
}

interface CharacterCardProps {
  character: Character;
  removeFromFavorites: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, removeFromFavorites }) => {
  const [favorited, setFavorited] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorited(favorites.some((fav: any) => fav.id === character.id));
  }, [character, removeFromFavorites]);

  const showNotification = (type: 'added' | 'removed') => {
    setNotification({
      message: type === 'added' 
        ? `${character.name} added to favorites!` 
        : `${character.name} removed from favorites!`,
      type
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = favorites.some((fav: any) => fav.id === character.id);

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== character.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorited(false);
      showNotification('removed');
      if (removeFromFavorites) removeFromFavorites(character.id);
    } else {
      const updatedFavorites = [...favorites, character];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorited(true);
      showNotification('added');
    }
    
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className={s.card}>
      {/* Уведомление */}
      {notification && (
        <div className={`${s.notification} ${s[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <Link to={`/characters/${character.id}`} className={s.cardLink}>
        <div className={s.characterImage}>
          <img src={character.image} alt={character.name} />
        </div>
        <div className={s.cardBody}>
          <h2 className={s.cardTitle}>{character.name}</h2>
          <p className={s.cardText}>Species: {character.species}</p>
          <p>First seen in:</p>
          <p className={s.cardText}>{character.location.name}</p>
        </div>
      </Link>
      <div className={s.actions}>
        <button className={s.favoriteBtn} onClick={toggleFavorite}>
          {favorited ? (
            <img src="/image-Photoroom.png" alt="Remove from favorites" className={s.favoritImage}/>
          ) : (
            <img src="/image-Photoroom 1.png" alt="Add to favorites" className={s.favoritImage}/>
          )}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;