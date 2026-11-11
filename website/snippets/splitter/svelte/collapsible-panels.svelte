<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-collapsible-panels.module.css';

  const id = $props.id();
  const panels = [
    {
      id: 'sidebar',
      minSize: 5,
      maxSize: 40,
      collapsible: true,
      collapsedSize: 5,
    },
    { id: 'content', minSize: 40 },
  ];
</script>

<Splitter {id} {panels} defaultSize={[28, 72]} class={styles.root}>
  <SplitterPanel id="sidebar" class={styles.panel}>Sidebar</SplitterPanel>
  <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
  <SplitterPanel id="content" class={styles.panel}>Content</SplitterPanel>
</Splitter>