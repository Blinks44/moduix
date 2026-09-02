import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import styles from './format-time-seconds-and-labels.module.css';

export default function FormatTimeSecondsAndLabelsDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Workspace activity</Card.Title>
        <Card.Description>Choose the level of detail that the task needs.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Last sync</span>
            <strong>
              <Format.Time value="09:08:12" withSeconds />
            </strong>
          </Stack>
          <Stack className={styles.row} direction="row" justify="space-between">
            <span>Support window</span>
            <strong>
              <Format.Time value="17:15" format="12h" amLabel="morning" pmLabel="evening" />
            </strong>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}