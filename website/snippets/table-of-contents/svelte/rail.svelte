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
  } from '@moduix/svelte/toc';
  import styles from '@/components/examples/table-of-contents/table-of-contents-rail.module.css';

  const items = [
    { value: 'toc-rail-overview', depth: 2, label: 'Overview' },
    { value: 'toc-rail-installation', depth: 2, label: 'Installation' },
    { value: 'toc-rail-package-manager', depth: 3, label: 'Package manager' },
    { value: 'toc-rail-dependencies', depth: 3, label: 'Peer dependencies' },
    { value: 'toc-rail-usage', depth: 2, label: 'Usage' },
    { value: 'toc-rail-server-components', depth: 3, label: 'Server components' },
    { value: 'toc-rail-theming', depth: 4, label: 'Theming' },
    { value: 'toc-rail-api', depth: 2, label: 'API reference' },
  ];

  const paragraphs = [
    'The rail is opt-in: it adds a visual hierarchy without changing Ark tracking, links, or heading semantics.',
    'Each curve connects the previous item depth to the current one, so readers can follow a branch through nested sections.',
    'Use it when hierarchy is useful context; the standard list stays the clearer choice for a flat document.',
  ];

  let scrollRef = $state<HTMLDivElement | null>(null);
</script>

<Toc class={styles.root} {items} scrollEl={() => scrollRef}>
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
          <svelte:element
            this={item.depth === 2 ? 'h2' : item.depth === 3 ? 'h3' : 'h4'}
            id={item.value}
          >
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
      {#each items as item, index (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>
            <TocRail
              depth={item.depth}
              previousDepth={items[index - 1]?.depth}
              nextDepth={items[index + 1]?.depth}
            />
            {item.label}
          </TocLink>
        </TocItem>
      {/each}
    </TocList>
  </TocNav>
</Toc>