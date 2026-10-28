import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function SolidReleaseHero() {
  return (
    <ChangelogHero>
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