<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
  import { panels } from './panels';

  let { onsubmit }: { onsubmit: () => void } = $props();
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    onsubmit();
  }}
>
  <Splitter id="form-splitter" {panels} defaultSize={[40, 60]} style="height: 200px">
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
</form>