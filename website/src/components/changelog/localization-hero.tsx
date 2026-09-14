import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero } from './hero';
import styles from './hero.module.css';

export function LocalizationHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      category={t('changelogDocumentationUpdate')}
      version="v2.2.4"
      date={t('localizationHeroDate')}
      dateTime="2026-08-10"
      title={t('localizationHeroTitle')}
      summary={t('localizationHeroSummary')}
      tone="violet"
    >
      <div className={styles.localizationPreview}>
        <span className={styles.languageCard}>EN</span>
        <span className={styles.languageCard}>FR</span>
        <span className={styles.languageCard}>RU</span>
      </div>
    </ChangelogHero>
  );
}