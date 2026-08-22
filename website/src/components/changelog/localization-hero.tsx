import { useI18n } from '@rspress/core/runtime';
import { Languages } from 'lucide-react';
import { ChangelogHero, ChangelogHeroCard } from './hero';

export function LocalizationHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      eyebrow={t('localizationHeroDate')}
      title={t('localizationHeroTitle')}
      summary={t('localizationHeroSummary')}
    >
      <ChangelogHeroCard label={t('localizationHeroLanguages')}>
        <Languages size={48} aria-hidden="true" />
      </ChangelogHeroCard>
    </ChangelogHero>
  );
}