import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function NavigationMenuHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v240--august-25-2026"
      category={t('changelogNewComponent')}
      date={t('navigationMenuHeroDate')}
      dateTime="2026-08-25"
      title="Navigation Menu"
      summary={t('navigationMenuHeroSummary')}
      tone="blue"
    >
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