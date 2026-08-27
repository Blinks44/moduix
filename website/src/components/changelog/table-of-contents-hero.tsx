import { useI18n } from '@rspress/core/runtime';
import { TableOfContents } from 'lucide-react';
import { ChangelogHero, ChangelogHeroCard } from './hero';

export function TableOfContentsHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      id="v250--august-27-2026"
      eyebrow={t('tableOfContentsHeroDate')}
      title={t('tableOfContentsHeroTitle')}
      summary={t('tableOfContentsHeroSummary')}
    >
      <ChangelogHeroCard
        label="Table of Contents"
        description={t('tableOfContentsHeroCardDescription')}
      >
        <TableOfContents size={48} aria-hidden="true" />
      </ChangelogHeroCard>
    </ChangelogHero>
  );
}