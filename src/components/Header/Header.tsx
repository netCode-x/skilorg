// Header.tsx
import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <a href="#" className={styles.logo}>
                THE <span>strikngly</span> BLOG
            </a>

            <nav className={styles.nav}>
                <a href="#">Home</a>
                <a href="#">Tools</a>
                <a href="#">Ceny</a>
                <a href="#">Sprzedawca</a>
                <a href="#">Wsparcie</a>
                <a href="#">airspace</a>
            </nav>

            <button className={styles.ctaButton}>
                This is a private tech blog website
            </button>
        </header>
    );
};

export default Header;