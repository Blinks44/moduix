import { useI18n } from '@rspress/core/runtime';
import { Navigation } from 'lucide-react';
import { ChangelogHero, ChangelogHeroCard } from './hero';

export function NavigationMenuHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v240--august-25-2026"
      eyebrow={t('navigationMenuHeroDate')}
      title={t('navigationMenuHeroTitle')}
      summary={t('navigationMenuHeroSummary')}
    >
      <ChangelogHeroCard
        label="Navigation Menu"
        description={t('navigationMenuHeroCardDescription')}
      >
        <Navigation size={48} aria-hidden="true" />
      </ChangelogHeroCard>
    </ChangelogHero>
  );
}