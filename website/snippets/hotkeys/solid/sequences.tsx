import { useFormatHotkey, useHotkeys } from '@ark-ui/solid';
import { Card } from '@moduix/solid/card';
import { Kbd } from '@moduix/solid/kbd';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function HotkeysSequencesDemo() {
  const [destination, setDestination] = createSignal('Home');
  const formatHotkey = useFormatHotkey();

  useHotkeys({
    commands: [
      {
        action: () => setDestination('Inbox'),
        hotkey: 'g > i',
        id: 'go-to-inbox',
        label: 'Go to inbox',
      },
      {
        action: () => setDestination('Drafts'),
        hotkey: 'g > d',
        id: 'go-to-drafts',
        label: 'Go to drafts',
      },
    ],
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>Workspace navigation</Card.Title>
        <Card.Description>Press G, then I or D before the sequence times out.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="3">
          <Stack align="center" direction="row" justify="space-between">
            <span>Open inbox</span>
            <Kbd>{formatHotkey('g > i')}</Kbd>
          </Stack>
          <Stack align="center" direction="row" justify="space-between">
            <span>Open drafts</span>
            <Kbd>{formatHotkey('g > d')}</Kbd>
          </Stack>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <output aria-live="polite">Current view: {destination()}</output>
      </Card.Footer>
    </Card>
  );
}