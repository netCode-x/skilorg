// src/components/LoginModal/LoginModal.tsx
import React, {useState} from 'react';
import styles from '@/components/LoginModal/LoginModal.module.scss';
import {LoginServiceReq, RegisterServiceReq} from "@/service/LoginService.tsx";
import type {LoginTypeResq, RegisterTypeResq} from "@/service/serviceType/LoginType.d..ts";
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // 新增成功消息
    const [loading, setLoading] = useState(false); // 加载状态

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (isLogin) {
            try {
                const reqData: LoginTypeResq = {
                    username: username.trim(),
                    password: password.trim()
                };
                const respLogin = await LoginServiceReq(reqData);
                if (respLogin.success) {
                    message.success("登录成功");
                    onLoginSuccess({username});
                    setTimeout(() => {
                        onClose();
                    }, 100);
                } else {
                    setError(respLogin.message || '登录失败');
                }
            } catch (error: unknown) {
                message.error("登录失败: " + error);
                setError('用户名或密码错误');
            } finally {
                setLoading(false);
            }
        } else {
            // ---------- 注册逻辑 ----------
            // 前端校验
            if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                setError('所有字段均为必填');
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setError('两次输入的密码不一致');
                setLoading(false);
                return;
            }

            // 模拟注册请求（实际应调用注册接口）
            // 假设注册成功
            // 实际项目中应调用类似 RegisterServiceReq 的 API
            try {
                const reqisData: RegisterTypeResq = {
                    username: username.trim(),
                    password: password.trim(),
                    email: email.trim()
                };
                await RegisterServiceReq(reqisData)
                // 注册成功 → 切换到登录模式
                setSuccess('🎉 注册成功，请登录');
                setError('');
                setIsLogin(true);           // 切换为登录
                setPassword('');            // 清空密码
                setConfirmPassword('');     // 清空确认密码
                setEmail('');               // 清空邮箱
                // 保留用户名，方便用户登录
                // 不调用 onLoginSuccess，不关闭弹窗
            } catch (err: any) {
                setError(err.message || '注册失败，请重试');
            } finally {
                setLoading(false);
            }
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        // 切换模式时不清空用户名
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
                            disabled={loading}
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
                                disabled={loading}
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
                            disabled={loading}
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
                                disabled={loading}
                            />
                        </div>
                    )}

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? '提交中...' : (isLogin ? '登录' : '注册')}
                    </button>
                </form>

                <p className={styles.switchText}>
                    {isLogin ? '还没有账号？' : '已有账号？'}
                    <button type="button" onClick={switchMode} className={styles.switchButton} disabled={loading}>
                        {isLogin ? '立即注册' : '前往登录'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;