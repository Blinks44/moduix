<script lang="ts">
  import { Button } from '@/components/button';
  import {
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterRootProvider,
    useSplitter,
  } from '@/components/splitter';
  import styles from './Splitter.stories.module.css';

  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
  const splitter = useSplitter({ id: 'splitter-root-provider', panels, defaultSize: [50, 50] });
</script>

<div class={styles.stack}>
  <div class={styles.toolbar}>
    <Button onclick={() => splitter().resetSizes()}>Reset</Button>
    <Button onclick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
  </div>
  <SplitterRootProvider value={splitter} class={styles.demo}>
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  </SplitterRootProvider>
</div>