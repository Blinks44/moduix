<script lang="ts">
  import { Toc, TocContent, TocItem, TocLink, TocList, TocNav, TocTitle } from '@/components/toc';
  import { items } from './items';

  let readerRef: HTMLDivElement | null = $state(null);
</script>

<Toc {items} scrollEl={() => readerRef}>
  <TocContent>
    <div bind:this={readerRef} aria-label="Reader" style="height: 200px; overflow: auto">
      <h2 id="introduction" style="height: 600px; margin: 0">Introduction</h2>
      <h3 id="configuration" style="height: 400px; margin: 0">Configuration</h3>
    </div>
  </TocContent>
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>{item.value}</TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>