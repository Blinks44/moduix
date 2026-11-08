<script lang="ts">
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';

  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
</script>

<Splitter
  id="override-splitter"
  class="h-64 w-96 border-2 bg-muted"
  {panels}
  defaultSize={[40, 60]}
>
  <SplitterPanel id="a" class="min-h-0 p-6">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="w-2 min-w-2" />
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>