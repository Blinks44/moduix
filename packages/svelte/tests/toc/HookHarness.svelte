<script lang="ts">
  import { TocContent, TocContext, TocRootProvider, useToc } from '@/components/toc';
  import { items } from './items';

  let { onActiveChange }: { onActiveChange: (details: unknown) => void } = $props();
  let activeIds: string[] | undefined = $state();

  const toc = useToc(() => ({
    id: 'hook-toc',
    items,
    activeIds,
    defaultActiveIds: ['introduction'],
    onActiveChange,
  }));

  export const setActiveIds = (value: string[]) => (activeIds = value);
</script>

<button type="button" onclick={() => toc().setActiveIds(['configuration'])}>
  Activate configuration
</button>
<TocRootProvider value={toc}>
  <TocContent style="padding-top: 2000px">
    <h2 id="introduction">Introduction</h2>
    <h3 id="configuration">Configuration</h3>
  </TocContent>
  <TocContext>
    {#snippet render(context)}
      <output>{context().activeIds.join(', ')}</output>
    {/snippet}
  </TocContext>
</TocRootProvider>