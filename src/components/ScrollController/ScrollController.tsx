import React, { useState, useEffect, useCallback } from 'react';
import styles from '@/components/ScrollController/ScrollController.module.scss';

const ScrollController: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    // 节流控制滚动事件
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isBottom = scrollY + windowHeight >= documentHeight - 10;

        // 滚动超过 200px 显示按钮
        setIsVisible(scrollY > 200);
        setIsAtTop(scrollY < 50 || isBottom); // 在顶部或底部时视为“端点”
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        // 初始检测
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleClick = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isBottom = scrollY + windowHeight >= documentHeight - 10;

        if (isBottom || scrollY < 50) {
            // 若在底部或顶部，则滚动到另一端
            if (isBottom) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: documentHeight, behavior: 'smooth' });
            }
        } else {
            // 中间位置则回到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!isVisible) return null;

    return (
        <button
            className={styles.scrollBtn}
            onClick={handleClick}
            aria-label="滚动至顶端或底端"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {isAtTop ? (
                    // 在顶部时显示向下箭头（回到底部）
                    <polyline points="6 9 12 15 18 9" />
                ) : (
                    // 否则显示向上箭头（回到顶部）
                    <polyline points="18 15 12 9 6 15" />
                )}
            </svg>
        </button>
    );
};

export default ScrollController;