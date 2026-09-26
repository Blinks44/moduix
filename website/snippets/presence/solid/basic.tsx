import { Presence } from '@ark-ui/solid/presence';
import { Button } from '@moduix/solid/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/solid/card';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/presence/presence-basic.module.css';

export default function PresenceBasicDemo() {
  const [present, setPresent] = createSignal(true);

  return (
    <Stack class={styles.root} align="center" gap={6}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present() ? 'Hide activity' : 'Show activity'}
      </Button>

      <Presence class={styles.panel} present={present()} unmountOnExit>
        <Card class={styles.card}>
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