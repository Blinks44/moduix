import { Format } from '@ark-ui/solid';
import { LocaleProvider } from '@ark-ui/solid/locale';

export function LocalizedFileSize() {
  return (
    <LocaleProvider locale="fr-FR">
      <Format.Byte value={1_450.45} />
    </LocaleProvider>
  );
}