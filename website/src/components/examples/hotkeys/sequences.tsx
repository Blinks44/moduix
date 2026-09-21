import { useFormatHotkey, useHotkeys } from '@ark-ui/react';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import { Kbd } from '@moduix/react/kbd';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from './hotkeys-sequences.module.css';

export default function HotkeysSequencesDemo() {
  const [destination, setDestination] = useState('Home');
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
    <Card className={styles.root}>
      <CardHeader>
        <CardTitle>Workspace navigation</CardTitle>
        <CardDescription>Press G, then I or D before the sequence times out.</CardDescription>
      </CardHeader>
      <CardBody>
        <Stack className={styles.stack} gap="3">
          <Stack align="center" direction="row" justify="space-between">
            <span>Open inbox</span>
            <Kbd>{formatHotkey('g > i')}</Kbd>
          </Stack>
          <Stack align="center" direction="row" justify="space-between">
            <span>Open drafts</span>
            <Kbd>{formatHotkey('g > d')}</Kbd>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <PreviewMeta style={{ marginInline: 'auto', placeItems: 'center' }}>
          <output aria-live="polite">Current view: {destination}</output>
        </PreviewMeta>
      </CardFooter>
    </Card>
  );
}