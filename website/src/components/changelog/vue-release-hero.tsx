import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function VueReleaseHero() {
  const t = useI18n<typeof import('i18n')>();
  return (
    <ChangelogHero
      id="vue"
      category={t('changelogNewFramework')}
      title="Vue"
      summary={t('vueReleaseHeroSummary')}
      tone="green"
    >
      <div className={`${styles.previewSurface} ${styles.solidPreview}`}>
        <div className={styles.solidTabs}>
          <span className={`${styles.solidTab} ${styles.solidTabIdle}`}>React</span>
          <span className={`${styles.solidTab} ${styles.solidTabIdle}`}>Solid</span>
          <span className={`${styles.solidTab} ${styles.solidTabActive}`}>Vue</span>
        </div>
        <div className={styles.solidPackages}>
          {['@moduix/vue', '@moduix/vue-tailwind'].map((name) => (
            <span key={name} className={styles.solidPackage}>
              <span className={styles.solidPackageDot} />
              <span className={styles.solidPackageName}>{name}</span>
            </span>
          ))}
        </div>
      </div>
    </ChangelogHero>
  );
}