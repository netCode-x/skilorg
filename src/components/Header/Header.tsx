import React, { useState } from 'react';
import styles from '@/components/Header/Header.module.scss';
import LoginModal from '@/components/LoginModal/LoginModal';

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className={styles.header}>
            <a href="#" className={styles.logo}>
                Personal <span>technical</span> BLOG
            </a>

            <nav className={styles.nav}>
                <a href="#">Home</a>
                <a href="#">Tools</a>
                <a href="#">Ceny</a>
                <a href="#">Sprzedawca</a>
                <a href="#">Wsparcie</a>
                <a href="#">airspace</a>
            </nav>

            <div className={styles.rightSection}>
                {/* 搜索框 */}
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="搜索..."
                        className={styles.searchInput}
                    />
                    <button className={styles.searchButton} aria-label="搜索">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </div>

                {/* 用户头像按钮 -> 点击打开弹窗 */}
                <button
                    className={styles.avatarButton}
                    aria-label="用户账号"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg viewBox="0 0 24 24" width="28" height="28">
                        <circle cx="12" cy="8" r="4" fill="currentColor"/>
                        <path d="M12 13c-4.42 0-8 2.69-8 6v1h16v-1c0-3.31-3.58-6-8-6z" fill="currentColor"/>
                    </svg>
                </button>
            </div>

            {/* 登录/注册弹窗 */}
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
};

export default Header;