<script lang="ts">
  import {
    TocContent,
    TocIndicator,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocRootProvider,
    TocTitle,
    useToc,
  } from '@/components/toc';
  import styles from './Toc.stories.module.css';
  import { items, paragraphs } from './tocItems';

  let scrollRef: HTMLDivElement | null = $state(null);
  const toc = useToc({
    id: 'toc-root-provider',
    items,
    defaultActiveIds: ['toc-story-installation'],
    scrollEl: () => scrollRef,
  });
</script>

<TocRootProvider value={toc}>
  <TocContent>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={scrollRef}
      aria-label="Scrollable document preview"
      class={styles.content}
      tabindex="0"
    >
      {#each items as item (item.value)}
        <section>
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
  <TocNav>
    <TocTitle>On this page</TocTitle>
    <TocList>
      <TocIndicator />
      {#each items as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>{item.label}</TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</TocRootProvider>