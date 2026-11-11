<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    createSplitterRegistry,
    Splitter,
    SplitterPanel,
    SplitterResizeTrigger,
  } from '@/components/splitter';
  import RootProviderExample from './RootProviderExample.svelte';
  import styles from './Splitter.stories.module.css';

  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];

  const { Story } = defineMeta({
    title: 'Components/Splitter',
    component: Splitter,
    args: { panels },
    parameters: { layout: 'centered' },
  });

  const collapsiblePanels = [
    { id: 'sidebar', minSize: 5, maxSize: 40, collapsible: true, collapsedSize: 5 },
    { id: 'content', minSize: 40 },
  ];
  const multiplePanels = [
    { id: 'a', minSize: 15 },
    { id: 'b', minSize: 15 },
    { id: 'c', minSize: 15 },
  ];
  const horizontalPanels = [
    { id: 'left', minSize: 20 },
    { id: 'right', minSize: 20 },
  ];
  const verticalPanels = [
    { id: 'top', minSize: 20 },
    { id: 'bottom', minSize: 20 },
  ];
</script>

<script lang="ts">
  let size = $state([30, 70]);
  let verticalSize = $state([50, 50]);
  const registry = createSplitterRegistry();
</script>

<Story name="Basic" asChild>
  <Splitter id="splitter-basic" {panels} defaultSize={[40, 60]} class={styles.demo}>
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  </Splitter>
</Story>

<Story name="Vertical" asChild>
  <Splitter
    id="splitter-vertical"
    orientation="vertical"
    {panels}
    defaultSize={[45, 55]}
    class={styles.vertical}
  >
    <SplitterPanel id="a" class={styles.panel}>Top</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>Bottom</SplitterPanel>
  </Splitter>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <Splitter id="splitter-controlled" bind:size {panels} class={styles.demo}>
      <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
    </Splitter>
    <output class={styles.status}>Sizes: {size.join(' / ')}</output>
  </div>
</Story>

<Story name="Collapsible" asChild>
  <Splitter
    id="splitter-collapsible"
    panels={collapsiblePanels}
    defaultSize={[28, 72]}
    class={styles.demo}
  >
    <SplitterPanel id="sidebar" class={styles.panel}>Sidebar</SplitterPanel>
    <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
    <SplitterPanel id="content" class={styles.panel}>Content</SplitterPanel>
  </Splitter>
</Story>

<Story name="Multiple Panels" asChild>
  <Splitter
    id="splitter-multiple"
    panels={multiplePanels}
    defaultSize={[25, 45, 30]}
    class={styles.demo}
  >
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
    <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
    <SplitterPanel id="c" class={styles.panel}>C</SplitterPanel>
  </Splitter>
</Story>

<Story name="Root Provider" asChild>
  <RootProviderExample />
</Story>

<Story name="Nested" asChild>
  <Splitter
    id="splitter-nested"
    panels={horizontalPanels}
    defaultSize={[35, 65]}
    {registry}
    class={styles.demo}
  >
    <SplitterPanel id="left" class={styles.panel}>Left</SplitterPanel>
    <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
    <SplitterPanel id="right">
      <Splitter
        id="splitter-nested-vertical"
        orientation="vertical"
        panels={verticalPanels}
        bind:size={verticalSize}
        {registry}
        class="h-full w-full"
      >
        <SplitterPanel id="top" class={styles.panel}>Top</SplitterPanel>
        <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
        <SplitterPanel id="bottom" class={styles.panel}>Bottom</SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </Splitter>
</Story>

<Story name="Custom Styling" asChild>
  <Splitter id="splitter-custom" {panels} defaultSize={[42, 58]} class={styles.custom}>
    <SplitterPanel id="a" class={styles.panel}>A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class={styles.panel}>B</SplitterPanel>
  </Splitter>
</Story>