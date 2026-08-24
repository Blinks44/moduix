import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

const storageSize = 1_024_000;

export default function FormatByteUnitSystemDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Storage allocation</Card.Title>
        <Card.Description>The same byte value can use different unit systems.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Stack direction="row" justify="space-between" style={{ inlineSize: '100%' }}>
            <span>Decimal (1000)</span>
            <strong>
              <Format.Byte unitSystem="decimal" value={storageSize} />
            </strong>
          </Stack>
          <Stack direction="row" justify="space-between" style={{ inlineSize: '100%' }}>
            <span>Binary (1024)</span>
            <strong>
              <Format.Byte unitSystem="binary" value={storageSize} />
            </strong>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}