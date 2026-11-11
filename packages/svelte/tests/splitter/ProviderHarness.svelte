<script lang="ts">
  import {
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterRootProvider,
    useSplitter,
  } from '@/components/splitter';
  import ContextControls from './ContextControls.svelte';
  import { panels } from './panels';

  const splitter = useSplitter({ id: 'provider-splitter', panels, defaultSize: [50, 50] });
  const sizes = $derived(splitter().getSizes().join(' / '));
</script>

<SplitterRootProvider value={splitter}>
  <ContextControls />
  <SplitterPanel id="a">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
  <SplitterPanel id="b">B</SplitterPanel>
</SplitterRootProvider>
<output>Sizes: {sizes}</output>