import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './CharacterDetail.module.scss';


const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchCharacter();
    }, [id]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorited = favorites.some((fav: any) => fav.id === character?.id);
        setFavorited(isFavorited);
    }, [character]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isAlreadyFavorite = favorites.some((fav: any) => fav.id === character.id);

        if (isAlreadyFavorite) {
            const updatedFavorites = favorites.filter((fav: any) => fav.id !== character.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorited(false);
        } else {
            const updatedFavorites = [...favorites, character];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorited(true);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={s.characterDetail}>
            <button className={s.homeButton} onClick={() => navigate('/')}>Go to Home</button>
            <div className={s.imageContainer}>
                <img src={character.image} alt={character.name} className={s.characterImage} />
            </div>

            <div className={s.details}>
                <h2>{character.name}</h2>
                <p><strong>Статус:</strong> {character.status}</p>
                <p><strong>Вид:</strong> {character.species}</p>
                <p><strong>Пол:</strong> {character.gender}</p>
                <p><strong>Тип:</strong> {character.type || 'Не указан'}</p>
                <p><strong>Происхождение:</strong> {character.origin.name}</p>
                <p><strong>Локация:</strong> {character.location.name}</p>
                <button className={s.favoriteBtn} onClick={toggleFavorite}>
                    {favorited ? 'Удалить из избранного' : 'Добавить в избранное'}
                </button>
            </div>
        </div>
    );
};

export default CharacterDetail;
