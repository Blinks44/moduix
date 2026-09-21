import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function ChartHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v230--august-20-2026"
      category={t('changelogNewComponent')}
      date={t('chartHeroDate')}
      dateTime="2026-08-20"
      title="Chart"
      summary={t('chartHeroSummary')}
      tone="blue"
    >
      <div className={`${styles.previewSurface} ${styles.chartPreview}`}>
        <div className={styles.chartHeader}>
          <span className={styles.chartHeading} />
          <span className={styles.chartValue} />
        </div>
        <div className={styles.chartPlot}>
          <svg viewBox="0 0 280 112" preserveAspectRatio="none">
            <path
              className={styles.chartArea}
              d="M0 92 C24 82 38 88 59 69 S96 76 119 50 S157 61 179 35 S218 45 241 22 S266 29 280 10 V112 H0 Z"
            />
            <path
              className={styles.chartLine}
              d="M0 92 C24 82 38 88 59 69 S96 76 119 50 S157 61 179 35 S218 45 241 22 S266 29 280 10"
            />
            <circle className={styles.chartPoint} cx="179" cy="35" r="4.5" />
          </svg>
        </div>
        <div className={styles.chartLegend}>
          <span />
          <span />
        </div>
      </div>
    </ChangelogHero>
  );
}