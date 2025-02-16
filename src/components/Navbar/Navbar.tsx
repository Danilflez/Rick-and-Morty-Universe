import React from 'react';
import { Link } from 'react-router-dom'; 
import s from './Navbar.module.scss';

interface NavbarProps {
    items: { title: string; link: string }[];
}

const menuItems: { title: string; link: string }[] = [
    { title: 'Favorites', link: '/favorites' }, 
];

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    const combinedItems = [...menuItems, ...items];

    return (
        <div className={s.navbar}>
            {combinedItems.map((item, index) => (
                <div key={index} className={s.navItem}>
                    <Link to={item.link}>{item.title}</Link>
                </div>
            ))}
        </div>
    );
}

export default Navbar;