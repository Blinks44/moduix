<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-basic.module.css';

  const id = $props.id();
  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
</script>

<Splitter {id} {panels} defaultSize={[40, 60]} class={styles.root}>
  <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
  <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
</Splitter>