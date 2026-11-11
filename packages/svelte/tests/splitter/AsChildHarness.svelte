<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
  import { panels } from './panels';
</script>

<Splitter id="as-child-splitter" {panels} defaultSize={[40, 60]}>
  <SplitterPanel id="a">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels">
    {#snippet asChild(props)}
      <button {...props()} type="button">Resize panels</button>
    {/snippet}
  </SplitterResizeTrigger>
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>