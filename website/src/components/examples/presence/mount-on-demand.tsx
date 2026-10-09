import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
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
          <CardHeader>
            <CardTitle>New workspace update</CardTitle>
            <CardDescription>The panel mounts only while it is needed.</CardDescription>
          </CardHeader>
          <CardBody>Publish the update when the release notes are ready for your team.</CardBody>
        </Card>
      </Presence>
    </Stack>
  );
}