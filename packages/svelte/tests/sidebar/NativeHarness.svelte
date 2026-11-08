<script lang="ts">
  import { SplitterPanel, SplitterRoot } from '@ark-ui/svelte/splitter';
  import NativeToggle from './NativeToggle.svelte';

  let { events }: { events: string[] } = $props();
  let size = $state<(number | string)[]>([32, 68]);

  export const getSize = () => size;
</script>

<SplitterRoot
  style="width: 800px; height: 400px"
  bind:size
  panels={[{ id: 'sidebar', minSize: 6, collapsedSize: 6, collapsible: true }, { id: 'content' }]}
  onCollapse={(details) => events.push(details.panelId)}
>
  <SplitterPanel id="sidebar"><NativeToggle /></SplitterPanel>
  <SplitterPanel id="content" />
</SplitterRoot>