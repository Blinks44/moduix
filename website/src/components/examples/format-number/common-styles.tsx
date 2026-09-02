import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/format-number/format-number-common-styles.module.css';

export default function FormatNumberCommonStylesDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <Card.Title>Campaign summary</Card.Title>
        <Card.Description>Format each metric for the way people read it.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Revenue</span>
            <strong>
              <Format.Number currency="USD" style="currency" value={12_450.75} />
            </strong>
          </Stack>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Conversion</span>
            <strong>
              <Format.Number maximumFractionDigits={1} style="percent" value={0.0642} />
            </strong>
          </Stack>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Impressions</span>
            <strong>
              <Format.Number notation="compact" value={125_000} />
            </strong>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}