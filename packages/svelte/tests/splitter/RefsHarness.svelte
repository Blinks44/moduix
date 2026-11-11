<script lang="ts">
  import {
    Splitter,
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterResizeTriggerIndicator,
  } from '@/components/splitter';
  import { panels } from './panels';

  let rootRef: Element | null = $state(null);
  let panelRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, panelRef, triggerRef, indicatorRef });
</script>

<Splitter bind:ref={rootRef} id="refs-splitter" {panels} defaultSize={[40, 60]} data-probe="root">
  <SplitterPanel bind:ref={panelRef} id="a">A</SplitterPanel>
  <SplitterResizeTrigger bind:ref={triggerRef} id="a:b" aria-label="Resize panels">
    <SplitterResizeTriggerIndicator bind:ref={indicatorRef} />
  </SplitterResizeTrigger>
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>