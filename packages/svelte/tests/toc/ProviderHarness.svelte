<script lang="ts">
  import {
    TocContent,
    TocContext,
    TocIndicator,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocRootProvider,
    TocTitle,
    useToc,
  } from '@/components/toc';
  import { items } from './items';

  const toc = useToc({ id: 'provider-toc', items });
</script>

<button type="button" onclick={() => toc().setActiveIds(['configuration'])}>
  Set active section
</button>
<TocRootProvider value={toc} style="color: red">
  <TocContent>
    <h2 id="introduction">Introduction</h2>
    <h3 id="configuration">Configuration</h3>
  </TocContent>
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      <TocIndicator />
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>{item.value}</TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
  <TocContext>
    {#snippet render(context)}
      <output>{context().activeIds.join(', ')}</output>
    {/snippet}
  </TocContext>
</TocRootProvider>