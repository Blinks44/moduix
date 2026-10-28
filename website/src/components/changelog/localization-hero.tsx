import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function LocalizationHero() {
  return (
    <ChangelogHero>
      <div className={styles.localizationPreview}>
        <span className={styles.languageCard}>EN</span>
        <span className={styles.languageCard}>FR</span>
        <span className={styles.languageCard}>RU</span>
      </div>
    </ChangelogHero>
  );
}