import { Presence } from '@ark-ui/solid/presence';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/presence/presence-exit-animations.module.css';

export default function PresenceExitAnimationsDemo() {
  const [present, setPresent] = createSignal(true);
  const [status, setStatus] = createSignal('Visible');

  return (
    <Stack gap={4}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present() ? 'Hide saved filters' : 'Show saved filters'}
      </Button>

      <Presence
        class={styles.panel}
        present={present()}
        unmountOnExit
        onEnterComplete={() => setStatus('Visible')}
        onExitComplete={() => setStatus('Hidden')}
      >
        <Card>Saved filters will apply to the next refresh.</Card>
      </Presence>

      <p aria-live="polite">Status: {status()}</p>
    </Stack>
  );
}