// Footer.tsx

import React from 'react';
import styles from './Footer.module.scss';

// 定义链接数据的类型
interface LinkItem {
    label: string;
    href: string;
}

interface ColumnData {
    title: string;
    links: LinkItem[];
}

// 将所有链接数据集中管理
const footerColumns: ColumnData[] = [
    {
        title: 'Strikingly',
        links: [
            { label: '首頁', href: '#' },
            { label: '模板', href: '#' },
            { label: 'AI網站構建器', href: '#' },
            { label: '升級套餐', href: '#' },
        ],
    },
    {
        title: '超級',
        links: [
            { label: 'Strikingly Kickstart', href: '#' },
            { label: 'AI Logo生成器', href: '#' },
            { label: 'iPhone 應用', href: '#' },
            { label: 'Strikingly 優惠券', href: '#' },
        ],
    },
    {
        title: '社區',
        links: [
            { label: 'Strikingly部落格', href: '#' },
            { label: '論壇', href: '#' },
            { label: '網站地圖', href: '#' },
        ],
    },
    {
        title: '合作夥伴',
        links: [
            { label: '聯盟分銷計劃', href: '#' },
            { label: '代理服務 & Reseller', href: '#' },
        ],
    },
    {
        title: '關於我們',
        links: [
            { label: '加入我們', href: '#' },
            { label: '我們的宣言', href: '#' },
            { label: '服務條款 & 隱私政策', href: '#' },
        ],
    },
    {
        title: '客戶服務及技術支援',
        links: [{ label: '知識庫', href: '#' }],
    },
];

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* 链接网格部分 */}
                <div className={styles.linkGrid}>
                    {footerColumns.map((column) => (
                        <div key={column.title} className={styles.column}>
                            <h3>{column.title}</h3>
                            <ul>
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 底部栏部分 (包含版权和社交图标) */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Strikingly. All rights reserved.
                    </p>
                    <div className={styles.socialIcons}>
                        {/* X (Twitter) Icon */}
                        <a href="#" aria-label="X (formerly Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                            </svg>
                        </a>
                        {/* Instagram Icon */}
                        <a href="#" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                            </svg>
                        </a>
                        {/* Facebook Icon */}
                        <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;