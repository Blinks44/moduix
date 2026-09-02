import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/format-byte/format-byte-unit-system.module.css';

const storageSize = 1_024_000;

export default function FormatByteUnitSystemDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <Card.Title>Storage allocation</Card.Title>
        <Card.Description>The same byte value can use different unit systems.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Decimal (1000)</span>
            <strong>
              <Format.Byte unitSystem="decimal" value={storageSize} />
            </strong>
          </Stack>
          <Stack className={styles.row} direction="row" justify="space-between">
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