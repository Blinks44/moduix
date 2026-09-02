import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/format-byte/format-byte-basic.module.css';

export default function FormatByteBasicDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <Card.Title>Weekly export</Card.Title>
        <Card.Description>Your CSV file is ready to download.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Download size</span>
          <strong>
            <Format.Byte value={1_450_450} />
          </strong>
        </Stack>
      </Card.Body>
      <Card.Footer>CSV · updated today</Card.Footer>
    </Card>
  );
}