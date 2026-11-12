<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-controlled.module.css';

  const id = $props.id();
  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
  let size = $state([30, 70]);
</script>

<div class={styles.stack}>
  <Splitter {id} bind:size {panels} class={styles.root}>
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  </Splitter>
  <div data-preview-meta>
    <output class={styles.status}>Sizes: {size.join(' / ')}</output>
  </div>
</div>