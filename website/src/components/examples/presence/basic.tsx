import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import styles from '@/components/examples/presence/presence-basic.module.css';

export default function PresenceBasicDemo() {
  const [present, setPresent] = useState(true);

  return (
    <Stack className={styles.root} align="center" gap={6}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present ? 'Hide activity' : 'Show activity'}
      </Button>

      <Presence className={styles.panel} present={present} unmountOnExit>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Import complete</CardTitle>
            <CardDescription>24 contacts are ready to review.</CardDescription>
          </CardHeader>
          <CardBody>
            Review their fields and invite them to the workspace when you are ready.
          </CardBody>
        </Card>
      </Presence>
    </Stack>
  );
}