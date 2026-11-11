<script lang="ts">
  import {
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterRootProvider,
    useSplitter,
  } from '@moduix/svelte/splitter';
  import styles from '@/components/examples/splitter/splitter-dynamic-collapsible.module.css';

  const id = $props.id();
  let root = $state<HTMLDivElement | null>(null);
  let rootSize = $state<number | null>(null);
  const isCompact = $derived(rootSize != null && rootSize < 520);
  const splitter = useSplitter(() => ({
    id,
    panels: [
      {
        id: 'sidebar',
        collapsible: isCompact,
        collapsedSize: 5,
        minSize: 18,
        maxSize: 40,
      },
      { id: 'content', minSize: 40 },
    ],
    defaultSize: [30, 70],
  }));

  $effect(() => {
    if (!root) return;
    const observer = new ResizeObserver(([entry]) => {
      rootSize = entry?.contentRect.width ?? null;
    });
    observer.observe(root);
    return () => observer.disconnect();
  });

  $effect(() => {
    if (isCompact) splitter().collapsePanel('sidebar');
    else splitter().expandPanel('sidebar');
  });
</script>

<SplitterRootProvider bind:ref={root} value={splitter} class={styles.root}>
  <SplitterPanel id="sidebar" class={styles.panel}>Sidebar</SplitterPanel>
  <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
  <SplitterPanel id="content" class={styles.panel}>Content</SplitterPanel>
</SplitterRootProvider>