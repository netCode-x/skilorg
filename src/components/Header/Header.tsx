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
                <a href="#">Szablony</a>
                <a href="#">Ceny</a>
                <a href="#">Sprzedawca</a>
                <a href="#">Wsparcie</a>
                <a href="#">Blog</a>
            </nav>

            <button className={styles.ctaButton}>
                Utwórz Swoją Darmową Stronę Internetową
            </button>
        </header>
    );
};

export default Header;