import React, { useState, useEffect } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import { useNavigate } from 'react-router-dom';
import s from './FavoretesPage.module.scss';

interface FavoritesPageProps {
    searchTerm: string;
}

interface Notification {
    message: string;
    type: 'added' | 'removed';
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ searchTerm }) => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notification, setNotification] = useState<Notification | null>(null);
    const charactersPerPage = 10;
    const navigate = useNavigate();

    const showNotification = (type: 'removed' | 'added', characterName: string) => {
        setNotification({
            message: type === 'removed' 
                ? `${characterName} removed from favorites!` 
                : `${characterName} added to favorites!`,
            type
        });
        
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    const filteredFavorites = favorites.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    };

    useEffect(() => {
        updateFavorites();
        window.addEventListener('storage', updateFavorites);
        return () => window.removeEventListener('storage', updateFavorites);
    }, []);

    useEffect(() => {
        const handleSearchChange = () => {
            setCurrentPage(1);
        };
        
        window.addEventListener('searchChange', handleSearchChange);
        return () => window.removeEventListener('searchChange', handleSearchChange);
    }, []);

    const removeFromFavorites = (characterId: number) => {
        const character = favorites.find(c => c.id === characterId);
        const updatedFavorites = favorites.filter(c => c.id !== characterId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        showNotification('removed', character.name);
    };

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentFavorites = filteredFavorites.slice(indexOfFirstCharacter, indexOfLastCharacter);
    const totalPages = Math.ceil(filteredFavorites.length / charactersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={s.favoritesPage}>
            <h1 className={s.text}>Favorites</h1>
            {(favorites.length === 0 || filteredFavorites.length === 0) && (
                <div className={s.emptyState}>
                    <h2>Список избранных пуст. Добавьте персонажей с главной страницы!</h2>
                </div>
            )}

            {notification && (
                <div className={`${s.notification} ${s[notification.type]}`}>
                    {notification.message}
                </div>
            )}

            <button className={s.homeButton} onClick={() => navigate('/')}>Go to Home</button>

            {filteredFavorites.length > 0 && (
                <div className={s.cardContainer}>
                    <div className={s.cardGrid}>
                        {currentFavorites.map((character: any) => (
                            <CharacterCard 
                                key={character.id} 
                                character={character} 
                                removeFromFavorites={removeFromFavorites} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {filteredFavorites.length > 0 && (
                <div className={s.pagination}>
                    <button onClick={prevPage} disabled={currentPage === 1} className={s.btnPagination}>
                        Previous
                    </button>
                    <span>{currentPage}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={s.btnPagination}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;