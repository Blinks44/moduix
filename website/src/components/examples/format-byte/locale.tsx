import { Format } from '@ark-ui/react';
import { LocaleProvider } from '@ark-ui/react/locale';

export function LocalizedFileSize() {
  return (
    <LocaleProvider locale="fr-FR">
      <Format.Byte value={1_450.45} />
    </LocaleProvider>
  );
}