<script lang="ts">
  import { useFormatHotkey, useHotkey } from '@ark-ui/svelte/hotkeys';
  import { Button } from '@moduix/svelte/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@moduix/svelte/card';
  import { Kbd } from '@moduix/svelte/kbd';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/hotkeys/hotkeys-basic.module.css';

  let status = $state('Not saved');
  const formatHotkey = useFormatHotkey();

  const saveDraft = () => {
    status = 'Saved just now';
  };

  useHotkey(() => ({
    action: saveDraft,
    hotkey: 'mod+S',
    label: 'Save draft',
    options: { preventDefault: true },
  }));
</script>

<Card class={styles.root}>
  <CardHeader>
    <CardTitle>Draft</CardTitle>
    <CardDescription>Save your changes without leaving the keyboard.</CardDescription>
  </CardHeader>
  <CardBody>
    <Stack align="center" direction="row" justify="space-between" class={styles.stack}>
      <span>Save draft</span>
      <Kbd>{formatHotkey('mod+S')}</Kbd>
    </Stack>
  </CardBody>
  <CardFooter>
    <div data-preview-meta style="margin-inline: auto; place-items: center">
      <output aria-live="polite">{status}</output>
      <Button onclick={saveDraft} type="button">Save draft</Button>
    </div>
  </CardFooter>
</Card>