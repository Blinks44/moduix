<script lang="ts">
  import {
    Toc,
    TocContent,
    TocContext,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocTitle,
  } from '@/components/toc';
  import { items } from './items';

  let { change }: { change: (details: unknown) => void } = $props();
  let activeIds = $state(['introduction']);
</script>

<Toc
  {items}
  {activeIds}
  onActiveChange={(details) => {
    change(details);
    activeIds = details.activeIds;
  }}
>
  <TocContent style="padding-top: 2000px">
    <h2 id="introduction">Introduction</h2>
    <h3 id="configuration">Configuration</h3>
    <TocContext>
      {#snippet render(context)}
        <button onclick={() => context().setActiveIds(['configuration'])}>
          Activate configuration
        </button>
      {/snippet}
    </TocContext>
  </TocContent>
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink>
            {#snippet asChild(props)}
              <a {...props()} href={'#' + item.value}>{item.value}</a>
            {/snippet}
          </TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>