import type { ReactNode } from 'react';
import styles from './hero.module.css';

type ChangelogHeroTone = 'blue' | 'cyan' | 'green' | 'orange' | 'violet';

export function ChangelogHero({
  id,
  category,
  date,
  dateTime,
  title,
  summary,
  tone,
  children,
}: {
  id?: string;
  category: string;
  date: string;
  dateTime: string;
  title: string;
  summary: string;
  tone: ChangelogHeroTone;
  children: ReactNode;
}) {
  return (
    <section className={`${styles.hero} ${styles[tone]}`} id={id} aria-label={title}>
      <div className={styles.meta}>
        <span className={styles.category}>{category}</span>
        <time className={styles.date} dateTime={dateTime}>
          {date}
        </time>
      </div>

      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.title}>{title}</p>
          <p className={styles.summary}>{summary}</p>
        </div>
        <div className={styles.visual} aria-hidden="true">
          {children}
        </div>
      </div>
    </section>
  );
}

export function ChangelogNewsItem({ children }: { children: ReactNode }) {
  return <div className={styles.newsItem}>{children}</div>;
}