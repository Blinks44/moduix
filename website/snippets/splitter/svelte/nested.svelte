<script lang="ts">
  import {
    createSplitterRegistry,
    Splitter,
    SplitterPanel,
    SplitterResizeTrigger,
  } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-nested.module.css';

  const id = $props.id();
  const horizontalPanels = [
    { id: 'left', minSize: 20 },
    { id: 'right', minSize: 20 },
  ];
  const verticalPanels = [
    { id: 'top', minSize: 20 },
    { id: 'bottom', minSize: 20 },
  ];
  const registry = createSplitterRegistry();
  let verticalSize = $state([50, 50]);
</script>

<Splitter {id} panels={horizontalPanels} defaultSize={[35, 65]} {registry} class={styles.root}>
  <SplitterPanel id="left" class={styles.panel}>Left</SplitterPanel>
  <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
  <SplitterPanel id="right">
    <Splitter
      id={`${id}-vertical`}
      bind:size={verticalSize}
      orientation="vertical"
      panels={verticalPanels}
      {registry}
    >
      <SplitterPanel id="top" class={styles.panel}>Top</SplitterPanel>
      <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
      <SplitterPanel id="bottom" class={styles.panel}>Bottom</SplitterPanel>
    </Splitter>
  </SplitterPanel>
</Splitter>