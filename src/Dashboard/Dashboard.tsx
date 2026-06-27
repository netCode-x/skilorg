// src/components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Dashboard.module.scss';

interface DashboardProps {
    user: { username: string; email?: string };
}

// 菜单项定义
const menuItems = [
    { key: 'dashboard', label: '📊 仪表盘' },
    { key: 'articles', label: '📝 文章管理' },
    { key: 'users', label: '👥 用户管理' },
    { key: 'categories', label: '🏷️ 分类管理' },
    { key: 'comments', label: '💬 评论管理' },
    { key: 'settings', label: '⚙️ 系统设置' },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const { logout } = useAuth();
    const [activeMenu, setActiveMenu] = useState('dashboard');

    // 根据不同菜单渲染不同内容
    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardOverview user={user} />;
            case 'articles':
                return <ArticleManagement />;
            case 'users':
                return <UserManagement />;
            case 'categories':
                return <CategoryManagement />;
            case 'comments':
                return <CommentManagement />;
            case 'settings':
                return <SystemSettings />;
            default:
                return <div>未知页面</div>;
        }
    };

    return (
        <div className={styles.dashboardLayout}>
            {/* 左侧菜单 */}
            <aside className={styles.sidebar}>
                <div className={styles.logoArea}>
                    <span className={styles.logo}>📘 MyBlog</span>
                </div>
                <nav className={styles.menu}>
                    {menuItems.map((item) => (
                        <a
                            key={item.key}
                            className={`${styles.menuItem} ${activeMenu === item.key ? styles.active : ''}`}
                            onClick={() => setActiveMenu(item.key)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className={styles.userInfo}>
                    <span className={styles.username}>{user.username}</span>
                    <button className={styles.logoutBtn} onClick={logout}>退出登录</button>
                </div>
            </aside>

            {/* 右侧内容区 */}
            <main className={styles.contentArea}>
                <div className={styles.contentHeader}>
                    <h2>{menuItems.find(item => item.key === activeMenu)?.label}</h2>
                </div>
                <div className={styles.contentBody}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

/* ----- 各模块组件（模拟数据） ----- */

const DashboardOverview: React.FC<{ user: { username: string } }> = ({ user }) => (
    <div className={styles.module}>
        <h3>👋 欢迎回来，{user.username}！</h3>
        <div className={styles.statsGrid}>
            <div className={styles.statCard}><span>总文章</span><b>12</b></div>
            <div className={styles.statCard}><span>总阅读</span><b>356</b></div>
            <div className={styles.statCard}><span>评论</span><b>89</b></div>
            <div className={styles.statCard}><span>用户</span><b>24</b></div>
        </div>
        <div style={{ marginTop: 24, color: '#666' }}>📌 最近更新：文章 “从Agent到具身智能” 刚刚发布。</div>
    </div>
);

const ArticleManagement: React.FC = () => (
    <div className={styles.module}>
        <table className={styles.table}>
            <thead><tr><th>ID</th><th>标题</th><th>分类</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>
            <tr><td>1</td><td>从Agent到具身智能</td><td>人工智能</td><td>已发布</td><td><button>编辑</button> <button>删除</button></td></tr>
            <tr><td>2</td><td>DeepSeek团队回应质疑</td><td>DeepSeek</td><td>草稿</td><td><button>编辑</button> <button>删除</button></td></tr>
            </tbody>
        </table>
    </div>
);

const UserManagement: React.FC = () => (
    <div className={styles.module}>
        <table className={styles.table}>
            <thead><tr><th>ID</th><th>用户名</th><th>邮箱</th><th>角色</th><th>操作</th></tr></thead>
            <tbody>
            <tr><td>1</td><td>admin</td><td>admin@blog.com</td><td>管理员</td><td><button>编辑</button> <button>禁用</button></td></tr>
            <tr><td>2</td><td>user1</td><td>user1@mail.com</td><td>作者</td><td><button>编辑</button> <button>禁用</button></td></tr>
            </tbody>
        </table>
    </div>
);

const CategoryManagement: React.FC = () => (
    <div className={styles.module}>
        <ul className={styles.list}>
            <li>人工智能 <span>12篇文章</span> <button>编辑</button> <button>删除</button></li>
            <li>DeepSeek <span>8篇文章</span> <button>编辑</button> <button>删除</button></li>
            <li>运维 <span>5篇文章</span> <button>编辑</button> <button>删除</button></li>
        </ul>
    </div>
);

const CommentManagement: React.FC = () => (
    <div className={styles.module}>
        <ul className={styles.list}>
            <li><strong>用户A</strong> 评论了文章 “从Agent到具身智能” <span>2026-06-27</span> <button>审核</button> <button>删除</button></li>
            <li><strong>用户B</strong> 评论了文章 “DeepSeek团队” <span>2026-06-26</span> <button>审核</button> <button>删除</button></li>
        </ul>
    </div>
);

const SystemSettings: React.FC = () => (
    <div className={styles.module}>
        <div className={styles.settingGroup}>
            <label>站点名称</label>
            <input type="text" defaultValue="MyBlog" />
        </div>
        <div className={styles.settingGroup}>
            <label>站点描述</label>
            <textarea defaultValue="个人技术博客" rows={3} />
        </div>
        <button className={styles.saveBtn}>保存设置</button>
    </div>
);

export default Dashboard;