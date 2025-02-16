import React, { useState, ChangeEvent } from 'react';
import s from './Header.module.scss';
import Navbar from '../Navbar/Navbar';

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); 
        window.dispatchEvent(new CustomEvent('searchChange', { detail: value }));
    };

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src='./Logo.png' alt="Rick and Morty Logo" style={{ height: '50px' }} />
            </div>
            <div className={s.searchContainer}>
                <input
                    type="text"
                    placeholder="Искать персонажей..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={s.searchInput}
                />
            </div>
            <div className={s.navbarConteiner}>
            <Navbar  items={[]} /> 
            </div>
        </div>
    );
};

export default Header;
