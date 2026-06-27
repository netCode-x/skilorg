// src/App.tsx
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Header from '@/components/Header/Header';
import BlogPost from '@/components/BlogPost/BlogPost';
import Sidebar from '@/components/Sidebar/Sidebar';
import Footer from '@/components/Footer/Footer';
import LoginModal from '@/components/LoginModal/LoginModal';
import Dashboard from '@/Dashboard/Dashboard';
import styles from './App.module.scss';

// 模拟博客文章数据
const mockPosts = [
    {
        id: 1,
        title: "7個最佳會員落地頁設計範例",
        date: "2026年6月24日",
        categories: "網站建造, 創業指南, 建站竅門",
        imageSrc: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "建立一個有效的會員落地頁設計對於吸引新會員和保留現有會員至關重要。一個精心設計的落地頁是潛在會員對您提供的服務的第一印象，因此從一開始就展示價值非常重要..."
    },
    {
        id: 2,
        title: "快速提高產品比較部落格流量的五個技巧",
        date: "2026年6月20日",
        categories: "營銷策略, SEO優化",
        imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "在競爭激烈的市場中，如何讓你的產品比較文章脫穎而出？本文將分享五個實用的SEO技巧，幫助你快速提升流量..."
    }
];

const AppContent: React.FC = () => {
    const { isLoggedIn, user, login, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'home' | 'dashboard'>('home');
    const [dashboardMenu, setDashboardMenu] = useState<string>('dashboard');

    // 登录后自动进入仪表盘
    useEffect(() => {
        if (isLoggedIn) {
            setViewMode('dashboard');
            setDashboardMenu('dashboard');
        } else {
            setViewMode('home');
        }
    }, [isLoggedIn]);

    const handleLoginSuccess = (userData: { username: string; email?: string }) => {
        login(userData);
    };

    const handleBackHome = () => {
        setViewMode('home');
    };

    const navigateToDashboard = (menu: string) => {
        setViewMode('dashboard');
        setDashboardMenu(menu);
    };

    // 退出登录
    const handleLogout = () => {
        logout();
        setViewMode('home');
    };

    const isHome = viewMode === 'home';

    return (
        <div className={styles.appContainer}>
            {isHome && (
                <Header
                    onAvatarClick={() => setIsModalOpen(true)}
                    onNavigateDashboard={() => navigateToDashboard('dashboard')}
                    onNavigateProfile={() => navigateToDashboard('profile')}
                    onNavigateSettings={() => navigateToDashboard('settings')}
                    onLogout={handleLogout}
                />
            )}

            {isHome && (
                <>
                    <div className={styles.banner}>
                        <span>💛 Na osobistych blogach można znaleźć wiele artykułów technicznych!</span>
                        <span className={styles.arrow}>→</span>
                    </div>
                    <nav className={styles.subNav}>
                        <a href="#" className={styles.active}>所有部落格</a>
                        <a href="#">搭建你的網站</a>
                        <a href="#">推廣你的網站</a>
                        <a href="#">創業</a>
                        <a href="#">設計靈感</a>
                        <a href="#">建站小貼士</a>
                    </nav>
                </>
            )}

            <main className={styles.mainContent}>
                <div className={styles.viewContainer}>
                    {viewMode === 'dashboard' ? (
                        <Dashboard
                            user={user!}
                            onBackHome={handleBackHome}
                            activeMenu={dashboardMenu}
                            onMenuChange={setDashboardMenu}
                        />
                    ) : (
                        <div className={styles.blogView}>
                            <div className={styles.feed}>
                                {mockPosts.map(post => (
                                    <BlogPost key={post.id} {...post} />
                                ))}
                            </div>
                            <Sidebar />
                        </div>
                    )}
                </div>
            </main>

            {isHome && <Footer />}

            <LoginModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

const App: React.FC = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;