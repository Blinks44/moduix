import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import styles from '@/components/examples/presence/presence-mount-on-demand.module.css';

export default function PresenceMountOnDemandDemo() {
  const [present, setPresent] = useState(false);

  return (
    <Stack className={styles.root} align="center" gap={6}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present ? 'Close update' : 'Open update'}
      </Button>

      <Presence className={styles.panel} lazyMount present={present} unmountOnExit>
        <Card className={styles.card}>
          <Card.Header>
            <Card.Title>New workspace update</Card.Title>
            <Card.Description>The panel mounts only while it is needed.</Card.Description>
          </Card.Header>
          <Card.Body>Publish the update when the release notes are ready for your team.</Card.Body>
        </Card>
      </Presence>
    </Stack>
  );
}