<script lang="ts">
  import {
    Toc,
    TocContent,
    TocIndicator,
    TocItem,
    TocLink,
    TocList,
    TocNav,
    TocTitle,
  } from '@moduix/svelte/toc';
  import styles from '@/components/examples/table-of-contents/table-of-contents-basic.module.css';

  const items = [
    {
      value: 'toc-basic-overview',
      depth: 2,
      label: 'Overview',
      description: 'Introduce the document and its intended readers.',
    },
    {
      value: 'toc-basic-installation',
      depth: 2,
      label: 'Installation',
      description: 'Add the package and import the parts you need.',
    },
    {
      value: 'toc-basic-configuration',
      depth: 3,
      label: 'Configuration',
      description: 'Use nested headings to express the document structure.',
    },
    {
      value: 'toc-basic-usage',
      depth: 2,
      label: 'Usage',
      description: 'Keep the navigation and content in the same root.',
    },
  ];

  const paragraphs = [
    'A table of contents helps readers orient themselves in a long document without interrupting their place in the text.',
    'This preview uses a dedicated reading pane. Its navigation observes only this pane, so scrolling the documentation page never changes the active heading.',
    'Keep values predictable and unique on the page. They become both the heading IDs and the same-page anchors used by the navigation.',
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
          <svelte:element this={item.depth === 2 ? 'h2' : 'h3'} id={item.value}>
            {item.label}
          </svelte:element>
          <p>{item.description}</p>
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
</Toc>