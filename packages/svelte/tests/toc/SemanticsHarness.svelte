<script lang="ts">
  import {
    Toc,
    TocContent,
    TocIndicator,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocRail,
    TocTitle,
  } from '@/components/toc';
  import { items } from './items';

  let rootRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, contentRef });
</script>

<Toc bind:ref={rootRef} {items} defaultActiveIds={['introduction']} data-probe="root">
  <TocContent bind:ref={contentRef}>
    <h2 id="introduction">Introduction</h2>
    <h3 id="configuration">Configuration</h3>
  </TocContent>
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      <TocIndicator />
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>
            {#if item.value === 'configuration'}
              <TocRail depth={item.depth} previousDepth={2} nextDepth={2} />
            {/if}
            {item.value}
          </TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>