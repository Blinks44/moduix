import { Format } from '@ark-ui/react';
import { LocaleProvider } from '@ark-ui/react/locale';

export default function LocaleBasicDemo() {
  return (
    <LocaleProvider locale="fr-FR">
      <section>
        <h2>Billing summary</h2>
        <p>Formatting follows one locale context.</p>
        <p>
          Plan price:{' '}
          <strong>
            <Format.Number currency="EUR" style="currency" value={1234.5} />
          </strong>
        </p>
      </section>
    </LocaleProvider>
  );
}