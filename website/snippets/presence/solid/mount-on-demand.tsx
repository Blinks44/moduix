import { Presence } from '@ark-ui/solid/presence';
import { Button } from '@moduix/solid/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/solid/card';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/presence/presence-mount-on-demand.module.css';

export default function PresenceMountOnDemandDemo() {
  const [present, setPresent] = createSignal(false);

  return (
    <Stack class={styles.root} align="center" gap={6}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present() ? 'Close update' : 'Open update'}
      </Button>

      <Presence class={styles.panel} lazyMount present={present()} unmountOnExit>
        <Card class={styles.card}>
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