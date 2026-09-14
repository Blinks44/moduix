import type { ReactNode } from 'react';
import styles from './hero.module.css';

type ChangelogHeroTone = 'blue' | 'orange' | 'violet';

export function ChangelogHero({
  id,
  category,
  version,
  date,
  dateTime,
  title,
  summary,
  tone,
  children,
}: {
  id?: string;
  category: string;
  version: string;
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
        <div className={styles.release}>
          <span className={styles.category}>{category}</span>
          <span className={styles.version}>{version}</span>
        </div>
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