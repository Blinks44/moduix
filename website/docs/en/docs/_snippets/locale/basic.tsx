import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { LocaleProvider } from '@moduix/react/locale';
import { Stack } from '@moduix/react/stack';

export default function LocaleBasicDemo() {
  return (
    <LocaleProvider locale="fr-FR">
      <Card>
        <Card.Header>
          <Card.Title>Billing summary</Card.Title>
          <Card.Description>Formatting follows one locale context.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap={2}>
            <span>Plan price</span>
            <strong>
              <Format.Number currency="EUR" style="currency" value={1234.5} />
            </strong>
          </Stack>
        </Card.Body>
      </Card>
    </LocaleProvider>
  );
}