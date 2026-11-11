<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-multiple-panels.module.css';

  const id = $props.id();
  const panels = [
    { id: 'a', minSize: 15 },
    { id: 'b', minSize: 15 },
    { id: 'c', minSize: 15 },
  ];
</script>

<Splitter {id} {panels} defaultSize={[25, 45, 30]} class={styles.root}>
  <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
  <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
  <SplitterPanel id="c" class={styles.panel}>C</SplitterPanel>
</Splitter>