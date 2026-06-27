// Sidebar.tsx
import React from 'react';
import styles from '@/components/Sidebar/Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.promoCard}>
                <h3>strikngly</h3>
                <p>Zaufany przez miliony przedsiębiorców i twórców.</p>
                <a href="#" className={styles.link}>Utwórz swoją darmową stronę już dziś →</a>
            </div>
        </aside>
    );
};

export default Sidebar;