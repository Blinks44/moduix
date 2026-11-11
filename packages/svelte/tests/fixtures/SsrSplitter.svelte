<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';

  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
</script>

<Splitter {panels} defaultSize={[40, 60]} id="ssr-splitter">
  <SplitterPanel id="a">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>