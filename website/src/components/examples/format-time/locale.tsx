import { Format } from '@ark-ui/react';
import { LocaleProvider } from '@ark-ui/react/locale';

const updatedAt = new Date('2026-01-15T17:15:00Z');

export default function FormatTimeLocaleDemo() {
  return (
    <LocaleProvider locale="fr-FR">
      <dl>
        <div>
          <dt>Schedule</dt>
          <dd>
            <Format.Time value="17:15" />
          </dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>
            <Format.Time value={updatedAt} />
          </dd>
        </div>
      </dl>
    </LocaleProvider>
  );
}