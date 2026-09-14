import { Format } from '@ark-ui/react';
import { LocaleProvider } from '@ark-ui/react/locale';

export default function LocalizedPrice() {
  return (
    <LocaleProvider locale="de-DE">
      <p>
        Price: <Format.Number currency="EUR" style="currency" value={1234.5} />
      </p>
    </LocaleProvider>
  );
}