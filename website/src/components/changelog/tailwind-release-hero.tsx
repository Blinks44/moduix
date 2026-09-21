import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

const TailwindLogo = () => (
  <svg className={styles.twMark} viewBox="0 0 54 33" fill="currentColor" aria-hidden="true">
    <path d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
  </svg>
);

export function TailwindReleaseHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v120--september-20-2026"
      category={t('changelogNewStylingTrack')}
      date={t('tailwindReleaseHeroDate')}
      dateTime="2026-09-20"
      title="Tailwind CSS"
      summary={t('tailwindReleaseHeroSummary')}
      tone="cyan"
    >
      <div className={`${styles.previewSurface} ${styles.tailwindPreview}`}>
        <div className={styles.twBrand}>
          <TailwindLogo />
          <span className={styles.twName}>Tailwind CSS</span>
        </div>
        <div className={styles.twUtilities}>
          <span className={styles.twUtility}>flex</span>
          <span className={styles.twUtility}>items-center</span>
          <span className={styles.twUtility}>rounded-xl</span>
          <span className={styles.twUtility}>bg-primary</span>
        </div>
        <div className={styles.twPackages}>
          <span className={styles.twPackage}>
            <span className={styles.twPackageDot} />
            <span className={styles.twPackageName}>@moduix/react-tailwind</span>
          </span>
          <span className={styles.twPackage}>
            <span className={styles.twPackageDot} />
            <span className={styles.twPackageName}>@moduix/solid-tailwind</span>
          </span>
        </div>
      </div>
    </ChangelogHero>
  );
}