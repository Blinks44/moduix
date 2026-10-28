import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function TableOfContentsHero() {
  return (
    <ChangelogHero>
      <div className={`${styles.previewSurface} ${styles.tocPreview}`}>
        <div className={styles.articleLines}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.tocLines}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </ChangelogHero>
  );
}