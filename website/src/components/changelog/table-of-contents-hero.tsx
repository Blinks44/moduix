import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function TableOfContentsHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v250--august-27-2026"
      category={t('changelogNewComponent')}
      date={t('tableOfContentsHeroDate')}
      dateTime="2026-08-27"
      title="Table of Contents"
      summary={t('tableOfContentsHeroSummary')}
      tone="blue"
    >
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