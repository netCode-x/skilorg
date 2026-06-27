// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import styles from '@/Dashboard/Dashboard.module.scss';

interface DashboardProps {
    user: { username: string; email?: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.welcomeCard}>
                <h1>👋 欢迎回来，{user.username}！</h1>
                <p>这是你的专属空间，你可以在这里管理你的博客和设置。</p>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.number}>12</span>
                        <span>已发布文章</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.number}>356</span>
                        <span>总阅读量</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.number}>89</span>
                        <span>评论</span>
                    </div>
                </div>
            </div>
            {/* 可添加更多内容，如最近文章列表等 */}
        </div>
    );
};

export default Dashboard;