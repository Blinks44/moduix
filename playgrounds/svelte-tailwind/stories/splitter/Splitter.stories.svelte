<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    createSplitterRegistry,
    Splitter,
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterResizeTriggerIndicator,
  } from '@/components/splitter';
  import RootProviderExample from './RootProviderExample.svelte';

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
  <Splitter
    id="splitter-basic"
    {panels}
    defaultSize={[40, 60]}
    class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full"
  >
    <SplitterPanel id="a" class="grid place-items-center font-medium">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class="grid place-items-center font-medium">B</SplitterPanel>
  </Splitter>
</Story>

<Story name="Vertical" asChild>
  <Splitter
    id="splitter-vertical"
    orientation="vertical"
    {panels}
    defaultSize={[45, 55]}
    class="h-112 w-[min(34rem,calc(100vw-2rem))] max-w-full"
  >
    <SplitterPanel id="a" class="grid place-items-center font-medium">Top</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class="grid place-items-center font-medium">Bottom</SplitterPanel>
  </Splitter>
</Story>

<Story name="Controlled" asChild>
  <div class="grid w-[min(56rem,calc(100vw-2rem))] min-w-[min(42rem,calc(100vw-2rem))] gap-4">
    <Splitter
      id="splitter-controlled"
      bind:size
      {panels}
      class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full"
    >
      <SplitterPanel id="a" class="grid place-items-center font-medium">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" class="grid place-items-center font-medium">B</SplitterPanel>
    </Splitter>
    <output class="text-sm leading-5 text-muted-foreground">Sizes: {size.join(' / ')}</output>
  </div>
</Story>

<Story name="Collapsible" asChild>
  <Splitter
    id="splitter-collapsible"
    panels={collapsiblePanels}
    defaultSize={[28, 72]}
    class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full"
  >
    <SplitterPanel id="sidebar" class="grid place-items-center font-medium">Sidebar</SplitterPanel>
    <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
    <SplitterPanel id="content" class="grid place-items-center font-medium">Content</SplitterPanel>
  </Splitter>
</Story>

<Story name="Multiple Panels" asChild>
  <Splitter
    id="splitter-multiple"
    panels={multiplePanels}
    defaultSize={[25, 45, 30]}
    class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full"
  >
    <SplitterPanel id="a" class="grid place-items-center font-medium">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels A and B" />
    <SplitterPanel id="b" class="grid place-items-center font-medium">B</SplitterPanel>
    <SplitterResizeTrigger id="b:c" aria-label="Resize panels B and C" />
    <SplitterPanel id="c" class="grid place-items-center font-medium">C</SplitterPanel>
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
    class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full"
  >
    <SplitterPanel id="left" class="grid place-items-center font-medium">Left</SplitterPanel>
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
        <SplitterPanel id="top" class="grid place-items-center font-medium">Top</SplitterPanel>
        <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
        <SplitterPanel id="bottom" class="grid place-items-center font-medium">Bottom</SplitterPanel
        >
      </Splitter>
    </SplitterPanel>
  </Splitter>
</Story>

<Story name="Custom Styling" asChild>
  <Splitter
    id="splitter-custom"
    {panels}
    defaultSize={[42, 58]}
    class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full border-foreground/16 bg-primary/5"
  >
    <SplitterPanel id="a" class="grid place-items-center bg-primary/4 font-medium">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="before:bg-foreground/24">
      <SplitterResizeTriggerIndicator class="border-foreground/24" />
    </SplitterResizeTrigger>
    <SplitterPanel id="b" class="grid place-items-center bg-primary/4 font-medium">B</SplitterPanel>
  </Splitter>
</Story>