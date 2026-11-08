<script lang="ts">
  import {
    Toc,
    TocContent,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocRail,
    TocTitle,
  } from '@/components/toc';

  const items = [
    { value: 'introduction', depth: 2 },
    { value: 'configuration', depth: 3 },
  ];
</script>

<Toc {items} defaultActiveIds={['introduction']} aria-label="Table of contents">
  <TocContent><h2 id="introduction">Introduction</h2></TocContent>
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={'#' + item.value}><TocRail depth={item.depth} />{item.value}</TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>