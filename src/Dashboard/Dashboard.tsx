// src/components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Dashboard.module.scss';

interface DashboardProps {
    user: { username: string; email?: string };
    onBackHome: () => void;
    activeMenu: string;
    onMenuChange: (key: string) => void;
}

const menuItems = [
    { key: 'dashboard', label: '📊 仪表盘' },
    { key: 'articles', label: '📝 文章管理' },
    { key: 'users', label: '👥 用户管理' },
    { key: 'categories', label: '🏷️ 分类管理' },
    { key: 'comments', label: '💬 评论管理' },
    { key: 'profile', label: '👤 个人资料' },
    { key: 'settings', label: '⚙️ 系统设置' },
];

const Dashboard: React.FC<DashboardProps> = ({
                                                 user,
                                                 onBackHome,
                                                 activeMenu,
                                                 onMenuChange,
                                             }) => {
    const { logout } = useAuth();

    // 自定义退出登录：清除状态并返回首页
    const handleLogout = () => {
        logout();
        onBackHome(); // 切换到首页（博客列表）
    };

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
            case 'profile':
                return <Profile user={user} />;
            case 'settings':
                return <SystemSettings />;
            default:
                return <div>未知页面</div>;
        }
    };

    return (
        <div className={styles.dashboardLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.logoArea}>
                    <span className={styles.logo} onClick={onBackHome} style={{ cursor: 'pointer' }}>
                        📘 MyBlog
                    </span>
                </div>
                <nav className={styles.menu}>
                    {menuItems.map((item) => (
                        <a
                            key={item.key}
                            className={`${styles.menuItem} ${activeMenu === item.key ? styles.active : ''}`}
                            onClick={() => onMenuChange(item.key)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className={styles.userInfo}>
                    <span className={styles.username}>{user.username}</span>
                    <button className={styles.logoutBtn} onClick={handleLogout}>退出登录</button>
                </div>
            </aside>

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

/* ----- 仪表盘概览 ----- */
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

/* ===== 文章管理（列表 + 编辑器，带 Markdown 预览） ===== */
const ArticleManagement: React.FC = () => {
    const [articles, setArticles] = useState([
        { id: 1, title: '从Agent到具身智能', category: '人工智能', status: '已发布', content: '## 引言\n具身智能是...' },
        { id: 2, title: 'DeepSeek团队回应质疑', category: 'DeepSeek', status: '草稿', content: '近日，DeepSeek...' },
        { id: 3, title: '探索AI Infra国产化落地路径', category: 'AI Infra', status: '已发布', content: 'OC城市行深圳站...' },
    ]);

    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingArticle, setEditingArticle] = useState<{ id?: number; title: string; category: string; status: string; content: string } | null>(null);

    const handleAdd = () => {
        setEditingArticle({ title: '', category: '', status: '草稿', content: '' });
        setView('editor');
    };

    const handleEdit = (article: typeof articles[0]) => {
        setEditingArticle({ ...article });
        setView('editor');
    };

    const handleSave = (publish: boolean) => {
        if (!editingArticle) return;
        const { title, category, content } = editingArticle;
        if (!title.trim() || !category.trim() || !content.trim()) {
            alert('标题、分类和内容不能为空');
            return;
        }
        const status = publish ? '已发布' : '草稿';
        if (editingArticle.id) {
            setArticles(articles.map(a =>
                a.id === editingArticle.id
                    ? { ...a, title, category, status, content }
                    : a
            ));
        } else {
            const newId = Math.max(0, ...articles.map(a => a.id)) + 1;
            setArticles([...articles, { id: newId, title, category, status, content }]);
        }
        setView('list');
    };

    const handleCancel = () => setView('list');

    const handleDelete = (id: number) => {
        if (window.confirm('确定要删除这篇文章吗？')) {
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    if (view === 'list') {
        return (
            <div className={styles.module}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: 14, color: '#888' }}>共 {articles.length} 篇文章</span>
                    <button className={styles.addBtn} onClick={handleAdd}>＋ 新增文章</button>
                </div>

                <table className={styles.table}>
                    <thead>
                    <tr><th>ID</th><th>标题</th><th>分类</th><th>状态</th><th>操作</th></tr>
                    </thead>
                    <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.category}</td>
                            <td><span className={article.status === '已发布' ? styles.published : styles.draft}>{article.status}</span></td>
                            <td>
                                <button onClick={() => handleEdit(article)}>编辑</button>
                                <button onClick={() => handleDelete(article.id)}>删除</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
                <h3>{editingArticle?.id ? '编辑文章' : '新增文章'}</h3>
                <button className={styles.cancelBtn} onClick={handleCancel}>返回列表</button>
            </div>

            <div className={styles.editorForm}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>标题</label>
                        <input
                            type="text"
                            value={editingArticle?.title || ''}
                            onChange={e => setEditingArticle(prev => prev ? { ...prev, title: e.target.value } : null)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>分类</label>
                        <input
                            type="text"
                            value={editingArticle?.category || ''}
                            onChange={e => setEditingArticle(prev => prev ? { ...prev, category: e.target.value } : null)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>状态</label>
                        <select
                            value={editingArticle?.status || '草稿'}
                            onChange={e => setEditingArticle(prev => prev ? { ...prev, status: e.target.value } : null)}
                        >
                            <option value="草稿">草稿</option>
                            <option value="已发布">已发布</option>
                        </select>
                    </div>
                </div>

                <div className={styles.editorSplit}>
                    <div className={styles.editorPane}>
                        <label>内容（Markdown）</label>
                        <textarea
                            className={styles.markdownEditor}
                            value={editingArticle?.content || ''}
                            onChange={e => setEditingArticle(prev => prev ? { ...prev, content: e.target.value } : null)}
                            rows={15}
                            placeholder="在此编写 Markdown 内容..."
                        />
                    </div>
                    <div className={styles.previewPane}>
                        <label>预览</label>
                        <div className={styles.markdownPreview}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {editingArticle?.content || '（空内容）'}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                <div className={styles.editorActions}>
                    <button className={styles.saveDraftBtn} onClick={() => handleSave(false)}>保存草稿</button>
                    <button className={styles.publishBtn} onClick={() => handleSave(true)}>发布</button>
                </div>
            </div>
        </div>
    );
};

/* ----- 其他模块 ----- */
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

const Profile: React.FC<{ user: { username: string; email?: string } }> = ({ user }) => (
    <div className={styles.module}>
        <div className={styles.profileCard}>
            <h3>👤 个人资料</h3>
            <div className={styles.profileItem}>
                <label>用户名</label>
                <span>{user.username}</span>
            </div>
            <div className={styles.profileItem}>
                <label>邮箱</label>
                <span>{user.email || '未设置'}</span>
            </div>
            <div className={styles.profileItem}>
                <label>会员等级</label>
                <span>管理员</span>
            </div>
            <div className={styles.profileItem}>
                <label>注册时间</label>
                <span>2026-01-01</span>
            </div>
        </div>
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