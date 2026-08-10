import { useI18n } from '@rspress/core/runtime';
import { ChangelogHero, ChangelogHeroCard } from './hero';

function LanguagesIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

export function LocalizationHero() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <ChangelogHero
      eyebrow={t('localizationHeroDate')}
      title={t('localizationHeroTitle')}
      summary={t('localizationHeroSummary')}
    >
      <ChangelogHeroCard label={t('localizationHeroLanguages')}>
        <LanguagesIcon />
      </ChangelogHeroCard>
    </ChangelogHero>
  );
}