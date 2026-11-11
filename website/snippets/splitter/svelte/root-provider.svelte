<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterRootProvider,
    useSplitter,
  } from '@moduix/svelte/splitter';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/splitter/splitter-root-provider.module.css';

  const id = $props.id();
  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
  const splitter = useSplitter({ id, panels, defaultSize: [50, 50] });
</script>

<div class={styles.stack}>
  <SplitterRootProvider value={splitter} class={styles.root}>
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  </SplitterRootProvider>
  <output class={styles.status}>Sizes: {splitter().getSizes().join(' / ')}</output>
  <Stack align="center" gap="2">
    <Button onclick={() => splitter().resetSizes()}>Reset</Button>
    <Button onclick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
  </Stack>
</div>