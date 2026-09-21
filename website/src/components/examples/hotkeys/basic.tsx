import { useFormatHotkey, useHotkey } from '@ark-ui/react';
import { Button } from '@moduix/react/button';
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
import styles from './hotkeys-basic.module.css';

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
    <Card className={styles.root}>
      <CardHeader>
        <CardTitle>Draft</CardTitle>
        <CardDescription>Save your changes without leaving the keyboard.</CardDescription>
      </CardHeader>
      <CardBody>
        <Stack align="center" direction="row" justify="space-between" className={styles.stack}>
          <span>Save draft</span>
          <Kbd>{formatHotkey('mod+S')}</Kbd>
        </Stack>
      </CardBody>
      <CardFooter>
        <PreviewMeta style={{ marginInline: 'auto', placeItems: 'center' }}>
          <output aria-live="polite">{status}</output>
          <Button onClick={saveDraft} type="button">
            Save draft
          </Button>
        </PreviewMeta>
      </CardFooter>
    </Card>
  );
}