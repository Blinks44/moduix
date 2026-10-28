import { useLang } from '@rspress/core/runtime';
import type { ReactNode } from 'react';
import styles from './hero.module.css';

// Illustration under an entry heading: a neutral card around the visual.
export function ChangelogHero({ children }: { children: ReactNode }) {
  return (
    <div className={styles.hero} aria-hidden="true">
      {children}
    </div>
  );
}

// One Changelog entry: version badge and date, then the MDX heading, illustration, and notes.
export function ChangelogNewsItem({
  version,
  dateTime,
  children,
}: {
  version: string;
  dateTime: string;
  children: ReactNode;
}) {
  const lang = useLang();
  const date = new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(dateTime),
  );

  return (
    <article className={styles.newsItem}>
      <div className={styles.entryMeta}>
        <span className={styles.version}>{version}</span>
        <time className={styles.date} dateTime={dateTime}>
          {date}
        </time>
      </div>
      {children}
    </article>
  );
}