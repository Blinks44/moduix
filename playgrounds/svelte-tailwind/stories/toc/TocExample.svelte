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
  import { items, paragraphs } from './tocItems';

  let { placement, withRail = false }: { placement?: 'left' | 'right'; withRail?: boolean } =
    $props();
  let scrollRef: HTMLDivElement | null = $state(null);
</script>

<Toc {items} scrollEl={() => scrollRef}>
  <TocContent>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={scrollRef}
      aria-label="Scrollable document preview"
      class="grid h-[26rem] gap-3 overflow-y-auto overscroll-contain rounded-md border border-border p-3"
      tabindex="0"
    >
      {#each items as item (item.value)}
        <section class={placement === 'left' ? undefined : 'rounded-md border border-border p-3'}>
          <svelte:element this={item.depth === 2 ? 'h2' : 'h3'} id={item.value}>
            {item.label}
          </svelte:element>
          {#each paragraphs as paragraph (paragraph)}
            <p>{paragraph}</p>
          {/each}
        </section>
      {/each}
    </div>
  </TocContent>

  <TocNav {placement}>
    <TocTitle>On this page</TocTitle>
    <TocList>
      {#if !withRail}<TocIndicator />{/if}
      {#each items as item, index (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>
            {#if withRail}
              <TocRail
                depth={item.depth}
                previousDepth={items[index - 1]?.depth}
                nextDepth={items[index + 1]?.depth}
              />
            {/if}
            {item.label}
          </TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>