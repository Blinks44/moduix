import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function SvelteReleaseHero() {
  return (
    <ChangelogHero>
      <div className={`${styles.previewSurface} ${styles.solidPreview} ${styles.sveltePreview}`}>
        <div className={styles.solidTabs}>
          {['React', 'Solid', 'Vue', 'Svelte'].map((framework) => (
            <span
              key={framework}
              className={`${styles.solidTab} ${framework === 'Svelte' ? styles.solidTabActive : styles.solidTabIdle}`}
            >
              {framework}
            </span>
          ))}
        </div>
        <div className={styles.solidPackages}>
          {['@moduix/svelte', '@moduix/svelte-tailwind'].map((name) => (
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