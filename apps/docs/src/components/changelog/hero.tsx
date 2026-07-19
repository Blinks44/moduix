import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './hero.module.css';

export function ChangelogHero({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.hero} aria-label={title}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>{children}</div>
      <p className={styles.summary}>{summary}</p>
    </section>
  );
}

export function ChangelogHeroCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.product}>
      {children}
      <span>{label}</span>
    </div>
  );
}

export function ChangelogHeroArrow() {
  return <ArrowRight className={styles.arrow} aria-hidden="true" />;
}