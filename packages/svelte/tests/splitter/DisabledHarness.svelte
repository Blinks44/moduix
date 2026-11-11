<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
  import { panels } from './panels';
</script>

<Splitter id="disabled-splitter" {panels} defaultSize={[40, 60]}>
  <SplitterPanel id="a">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
    <span>Grip</span>
  </SplitterResizeTrigger>
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>