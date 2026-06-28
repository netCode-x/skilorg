// src/components/LoginModal/LoginModal.tsx
import React, {useState} from 'react';
import styles from '@/components/LoginModal/LoginModal.module.scss';
import {LoginServiceReq} from "@/service/LoginService.tsx";
import type {LoginTypeResq} from "@/service/serviceType/LoginType.d..ts";
import {message} from "antd";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (userData: { username: string; email?: string }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose, onLoginSuccess}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // 显示错误信息

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (isLogin) {
            try {
                const reqData: LoginTypeResq = {
                    username: username.trim(),
                    password: password.trim()
                }
              const  respLogin= await LoginServiceReq(reqData);
                if (respLogin.success){
                    message.success("登录成功")
                    onLoginSuccess({username});
                    setTimeout(() => {
                        onClose();
                    }, 100);
                }
            } catch (error: unknown) {
                message.error("登录失败: " + error);
                setError('用户名或密码错误');
            }
        } else {
            // 注册验证：简单检查非空
            if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                setError('所有字段均为必填');
                return;
            }
            if (password !== confirmPassword) {
                setError('两次输入的密码不一致');
                return;
            }
            // 注册成功
            onLoginSuccess({username, email});
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <h2 className={styles.title}>{isLogin ? '登录' : '注册'}</h2>

                <form onSubmit={handleSubmit}>
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

                    {error && <div className={styles.error}>{error}</div>}

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