<script lang="ts">
  import { Toc, TocContent, TocIndicator, TocItem, TocLink, TocList } from '@/components/toc';
  import { items } from './items';
</script>

<Toc {items} defaultActiveIds={['introduction']}>
  <TocContent>
    <h2 id="introduction">Introduction</h2>
    <h3 id="configuration">Configuration</h3>
  </TocContent>
  <div style="--top: 300px; --height: 500px">
    <TocList>
      <TocIndicator />
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>{item.value}</TocLink>
        </TocItem>
      {/each}
    </TocList>
  </div>
</Toc>