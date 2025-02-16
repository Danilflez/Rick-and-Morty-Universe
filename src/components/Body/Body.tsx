import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../CharacterCard/CharacterCard';
import s from './Body.module.scss';

interface BodyProps {
  searchTerm: string;
}

const Body: React.FC<BodyProps> = ({ searchTerm  }) => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const charactersPerPage = 10;

    useEffect(() => {
      const handleStorageChange = () => {
        setUpdateTrigger(prev => prev + 1);
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                setCharacters(response.data.results);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [updateTrigger]);

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredCharacters.length / charactersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={s.body}>
            {filteredCharacters.length === 0 ? (
                <div className={s.emptyState}>
                    <h2>Список пуст</h2>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            ) : (
                <>
                    <div className={s.cardContainer}>
                        <div className={s.cardGrid}>
                            {currentCharacters.map(character => (
                               <CharacterCard 
                               key={character.id} 
                               character={character} 
                               removeFromFavorites={() => {}}
                             />
                            ))}
                        </div>
                    </div>
                    {filteredCharacters.length > charactersPerPage && (
                        <div className={s.pagination}>
                            <button 
                                onClick={prevPage} 
                                disabled={currentPage === 1} 
                                className={s.btnPagination}
                            >
                                Предыдущая
                            </button>
                            <span>{currentPage}</span>
                            <button 
                                onClick={nextPage} 
                                disabled={currentPage === Math.ceil(filteredCharacters.length / charactersPerPage)} 
                                className={s.btnPagination}
                            >
                                Следующая
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default Body;
