// BlogPost.tsx
import React from 'react';
import styles from '@/components/BlogPost/BlogPost.module.scss';

interface BlogPostProps {
    title: string;
    date: string;
    categories: string;
    imageSrc: string;
    excerpt: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, categories, imageSrc, excerpt }) => {
    return (
        <article className={styles.post}>
            <img src={imageSrc} alt={title} className={styles.thumbnail} />

            <div className={styles.content}>
                <h2>{title}</h2>
                <div className={styles.meta}>
                    <span>{date}</span> · <span>{categories}</span>
                </div>
                <p className={styles.excerpt}>{excerpt}</p>
                <a href="#" className={styles.readMore}>查看更多...</a>
            </div>
        </article>
    );
};

export default BlogPost;