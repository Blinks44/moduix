import { Presence } from '@ark-ui/solid/presence';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
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