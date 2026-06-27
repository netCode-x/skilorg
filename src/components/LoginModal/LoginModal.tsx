import React, { useState } from 'react';
import styles from '@/components/LoginModal/LoginModal.module.scss';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            // 登录：使用 username 和 password
            console.log('登录', { username, password });
            // 调用登录 API
        } else {
            // 注册：使用 username, email, password
            console.log('注册', { username, email, password, confirmPassword });
            // 调用注册 API
        }
        onClose();
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <h2 className={styles.title}>{isLogin ? '登录' : '注册'}</h2>

                <form onSubmit={handleSubmit}>
                    {/* 用户名：登录和注册都显示 */}
                    <div className={styles.field}>
                        <label htmlFor="username">用户名</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="请输入用户名"
                        />
                    </div>

                    {/* 邮箱：仅注册时显示 */}
                    {!isLogin && (
                        <div className={styles.field}>
                            <label htmlFor="email">邮箱</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="请输入邮箱"
                            />
                        </div>
                    )}

                    {/* 密码：登录和注册都显示 */}
                    <div className={styles.field}>
                        <label htmlFor="password">密码</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="请输入密码"
                        />
                    </div>

                    {/* 确认密码：仅注册时显示 */}
                    {!isLogin && (
                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">确认密码</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="请再次输入密码"
                            />
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? '登录' : '注册'}
                    </button>
                </form>

                <p className={styles.switchText}>
                    {isLogin ? '还没有账号？' : '已有账号？'}
                    <button type="button" onClick={switchMode} className={styles.switchButton}>
                        {isLogin ? '立即注册' : '前往登录'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;