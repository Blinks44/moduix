import { useFormatHotkey, useHotkey } from '@ark-ui/solid';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Kbd } from '@moduix/solid/kbd';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function HotkeysBasicDemo() {
  const [status, setStatus] = createSignal('Not saved');
  const formatHotkey = useFormatHotkey();

  const saveDraft = () => {
    setStatus('Saved just now');
  };

  useHotkey({
    action: saveDraft,
    hotkey: 'mod+S',
    label: 'Save draft',
    options: { preventDefault: true },
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>Draft</Card.Title>
        <Card.Description>Save your changes without leaving the keyboard.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack align="center" direction="row" justify="space-between">
          <span>Save draft</span>
          <Kbd>{formatHotkey('mod+S')}</Kbd>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Stack align="center" direction="row" justify="space-between">
          <output aria-live="polite">{status()}</output>
          <Button onClick={saveDraft} type="button">
            Save draft
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}