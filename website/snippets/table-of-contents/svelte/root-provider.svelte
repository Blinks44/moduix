<script lang="ts">
  import { Button } from '@moduix/svelte/button';
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
  } from '@moduix/svelte/toc';
  import styles from '@/components/examples/table-of-contents/table-of-contents-root-provider.module.css';

  const items = [
    { value: 'toc-provider-overview', depth: 2, label: 'Overview' },
    { value: 'toc-provider-installation', depth: 2, label: 'Installation' },
    { value: 'toc-provider-usage', depth: 2, label: 'Usage' },
  ];

  const paragraphs = [
    'The store can power controls outside the navigation while the same visible-heading state still drives the links.',
    'In an embedded reader, point scrollEl to the pane that owns the overflow. This prevents document scroll from influencing the active section.',
    'Use the public scrollTo method when a separate control should move the reader to a known section.',
  ];

  const id = $props.id();
  let scrollRef = $state<HTMLDivElement | null>(null);
  const toc = useToc({
    id,
    items,
    defaultActiveIds: ['toc-provider-overview'],
    scrollEl: () => scrollRef,
  });
</script>

<div class={styles.root}>
  <output class={styles.status}>Active: {toc().activeIds.join(', ') || 'none'}</output>
  <div class={styles.actions}>
    {#each items as item (item.value)}
      <Button size="sm" variant="outline" onclick={() => toc().scrollTo(item.value)}>
        Scroll to {item.label}
      </Button>
    {/each}
  </div>

  <TocRootProvider class={styles.toc} value={toc}>
    <TocContent>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div
        bind:this={scrollRef}
        role="region"
        aria-label="Scrollable document preview"
        class={styles.scrollArea}
        tabindex="0"
      >
        {#each items as item (item.value)}
          <section>
            <h2 id={item.value}>{item.label}</h2>
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
</div>