<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
  import { panels } from './panels';
</script>

<Splitter id="test-splitter" {panels} defaultSize={[40, 60]}>
  <SplitterPanel id="a"><button type="button">A</button></SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>