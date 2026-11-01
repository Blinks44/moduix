import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function NavigationMenuHero() {
  return (
    <ChangelogHero>
      <div className={`${styles.previewSurface} ${styles.navigationPreview}`}>
        <div className={styles.browserBar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.navRow}>
          <span className={styles.navMark} />
          <span className={styles.navLink} />
          <span className={styles.navLink} />
          <span className={styles.navLink} />
        </div>
        <div className={styles.menuPanel}>
          {Array.from({ length: 4 }, (_, index) => (
            <span className={styles.menuItem} key={index}>
              <span className={styles.menuIcon} />
              <span className={styles.menuLine} />
            </span>
          ))}
        </div>
      </div>
    </ChangelogHero>
  );
}