import { Format } from '@ark-ui/solid';
import { LocaleProvider } from '@ark-ui/solid/locale';

const lastUpdatedAt = new Date(Date.now() - 24 * 60 * 60 * 1000);

export default function FormatRelativeTimeLocaleDemo() {
  return (
    <LocaleProvider locale="fr-FR">
      <p>
        Last updated:{' '}
        <time dateTime={lastUpdatedAt.toISOString()}>
          <Format.RelativeTime numeric="auto" value={lastUpdatedAt} />
        </time>
      </p>
    </LocaleProvider>
  );
}