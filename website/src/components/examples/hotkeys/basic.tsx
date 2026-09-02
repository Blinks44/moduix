import { useFormatHotkey, useHotkey } from '@ark-ui/react';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Kbd } from '@moduix/react/kbd';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function HotkeysBasicDemo() {
  const [status, setStatus] = useState('Not saved');
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
    <Card style={{ inlineSize: '100%' }}>
      <Card.Header>
        <Card.Title>Draft</Card.Title>
        <Card.Description>Save your changes without leaving the keyboard.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack
          align="center"
          direction="row"
          justify="space-between"
          style={{ inlineSize: '100%' }}
        >
          <span>Save draft</span>
          <Kbd>{formatHotkey('mod+S')}</Kbd>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Stack
          align="center"
          direction="row"
          justify="space-between"
          style={{ inlineSize: '100%' }}
        >
          <output>{status}</output>
          <Button onClick={saveDraft} type="button">
            Save draft
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}