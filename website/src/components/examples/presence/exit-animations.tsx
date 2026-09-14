import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import styles from '@/components/examples/presence/presence-exit-animations.module.css';

export default function PresenceExitAnimationsDemo() {
  const [present, setPresent] = useState(true);
  const [status, setStatus] = useState('Visible');

  return (
    <Stack gap={4}>
      <Button
        size="sm"
        type="button"
        variant="outline"
        onClick={() => setPresent((value) => !value)}
      >
        {present ? 'Hide saved filters' : 'Show saved filters'}
      </Button>

      <Presence
        className={styles.panel}
        present={present}
        unmountOnExit
        onEnterComplete={() => setStatus('Visible')}
        onExitComplete={() => setStatus('Hidden')}
      >
        <Card>Saved filters will apply to the next refresh.</Card>
      </Presence>

      <p aria-live="polite">Status: {status}</p>
    </Stack>
  );
}