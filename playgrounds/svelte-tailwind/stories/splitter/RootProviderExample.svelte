<script lang="ts">
  import { Button } from '@/components/button';
  import {
    SplitterPanel,
    SplitterResizeTrigger,
    SplitterRootProvider,
    useSplitter,
  } from '@/components/splitter';

  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];
  const splitter = useSplitter({ id: 'splitter-root-provider', panels, defaultSize: [50, 50] });
</script>

<div class="grid w-[min(56rem,calc(100vw-2rem))] min-w-[min(42rem,calc(100vw-2rem))] gap-4">
  <div class="flex flex-wrap gap-2">
    <Button onclick={() => splitter().resetSizes()}>Reset</Button>
    <Button onclick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
  </div>
  <SplitterRootProvider value={splitter} class="h-112 w-[min(56rem,calc(100vw-2rem))] max-w-full">
    <SplitterPanel id="a" class="grid place-items-center font-medium">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" class="grid place-items-center font-medium">B</SplitterPanel>
  </SplitterRootProvider>
</div>