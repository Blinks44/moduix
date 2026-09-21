import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function SolidReleaseHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v100-solid--september-13-2026"
      category={t('changelogNewFramework')}
      date={t('solidReleaseHeroDate')}
      dateTime="2026-09-13"
      title="Solid"
      summary={t('solidReleaseHeroSummary')}
      tone="green"
    >
      <div className={`${styles.previewSurface} ${styles.solidPreview}`}>
        <div className={styles.solidTabs}>
          <span className={`${styles.solidTab} ${styles.solidTabIdle}`}>React</span>
          <span className={`${styles.solidTab} ${styles.solidTabActive}`}>
            <span className={styles.solidOrbitMark} />
            Solid
          </span>
        </div>
        <div className={styles.solidPackages}>
          <span className={styles.solidPackage}>
            <span className={styles.solidPackageDot} />
            <span className={styles.solidPackageName}>@moduix/solid</span>
          </span>
          <span className={styles.solidPackage}>
            <span className={styles.solidPackageDot} />
            <span className={styles.solidPackageName}>@moduix/solid-tailwind</span>
          </span>
        </div>
      </div>
    </ChangelogHero>
  );
}