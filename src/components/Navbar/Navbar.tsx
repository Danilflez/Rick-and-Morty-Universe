import React from 'react';
import s from './Navbar.module.scss';

interface NavbarProps {
    items: { title: string; link: string }[];
}

const menuItems: { title: string; link: string }[] = [
    { title: 'Favorites', link: '/Rick-and-Morty-Universe/favorites' },
    
];

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    const combinedItems = [...menuItems, ...items];

    return (
        <div className={s.navbar}>
            
                {combinedItems.map((item, index) => (
                    <a key={index} className={s.navItem}>
                        <a href={item.link}>{item.title}</a>
                    </a>
                ))}
            
        </div>
    );
}

export default Navbar;
