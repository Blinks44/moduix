<script lang="ts">
  import { useFormatHotkey, useHotkeys } from '@ark-ui/svelte/hotkeys';
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
  import styles from '@/components/examples/hotkeys/hotkeys-sequences.module.css';

  let destination = $state('Home');
  const formatHotkey = useFormatHotkey();

  useHotkeys(() => ({
    commands: [
      {
        action: () => (destination = 'Inbox'),
        hotkey: 'g > i',
        id: 'go-to-inbox',
        label: 'Go to inbox',
      },
      {
        action: () => (destination = 'Drafts'),
        hotkey: 'g > d',
        id: 'go-to-drafts',
        label: 'Go to drafts',
      },
    ],
  }));
</script>

<Card class={styles.root}>
  <CardHeader>
    <CardTitle>Workspace navigation</CardTitle>
    <CardDescription>Press G, then I or D before the sequence times out.</CardDescription>
  </CardHeader>
  <CardBody>
    <Stack class={styles.stack} gap="3">
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
    <div data-preview-meta style="margin-inline: auto; place-items: center">
      <output aria-live="polite">Current view: {destination}</output>
    </div>
  </CardFooter>
</Card>