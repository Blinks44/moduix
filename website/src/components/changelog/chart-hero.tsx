import { useI18n } from '@rspress/core/runtime';
import { ChartPie } from 'lucide-react';
import { ChangelogHero, ChangelogHeroCard } from './hero';

export function ChartHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v230--august-20-2026"
      eyebrow={t('chartHeroDate')}
      title={t('changelogNewComponent')}
      summary={t('chartHeroSummary')}
    >
      <ChangelogHeroCard label="Chart">
        <ChartPie size={48} aria-hidden="true" />
      </ChangelogHeroCard>
    </ChangelogHero>
  );
}