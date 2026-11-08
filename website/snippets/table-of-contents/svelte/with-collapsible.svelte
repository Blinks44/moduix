<script lang="ts">
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import {
    Toc,
    TocContent,
    TocContext,
    TocIndicator,
    TocItem,
    TocLink,
    TocList,
  } from '@moduix/svelte/toc';
  import styles from '@/components/examples/table-of-contents/table-of-contents-with-collapsible.module.css';

  const items = [
    { value: 'toc-collapsible-overview', depth: 2, label: 'Overview' },
    { value: 'toc-collapsible-prerequisites', depth: 2, label: 'Prerequisites' },
    { value: 'toc-collapsible-quick-start', depth: 2, label: 'Quick start' },
    { value: 'toc-collapsible-commands', depth: 2, label: 'Core commands' },
    { value: 'toc-collapsible-troubleshooting', depth: 2, label: 'Troubleshooting' },
  ];

  const paragraphs = [
    'A collapsible navigation keeps the current section visible while giving the reader more room for the article.',
    'The same items drive the headings and links, so the active state stays synchronized with the scrollable reading pane.',
    'Use this pattern when a compact navigation control is more useful than a permanently expanded table of contents.',
  ];

  let scrollRef = $state<HTMLDivElement | null>(null);
  const getActiveIndex = (activeItems: Array<{ value: string }>) =>
    items.findIndex((item) => item.value === activeItems[0]?.value);
  const getActiveLabel = (activeItems: Array<{ value: string }>) =>
    items[getActiveIndex(activeItems)]?.label ?? 'On this page';
  const getProgress = (activeItems: Array<{ value: string }>) => {
    const index = getActiveIndex(activeItems);
    return index >= 0 ? ((index + 1) / items.length) * 100 : 0;
  };
</script>

<Toc class={styles.root} {items} scrollEl={() => scrollRef}>
  <Collapsible class={styles.collapsibleRoot} defaultOpen>
    <TocContext>
      {#snippet render(context)}
        <CollapsibleTrigger>
          <span class={styles.triggerContent}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 36 36"
              aria-hidden="true"
              class={styles.progressRing}
            >
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                stroke-opacity="0.2"
                stroke-width="2.5"
              />
              <circle
                data-progress
                cx="18"
                cy="18"
                r="14"
                fill="none"
                pathLength="100"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-dasharray={`${getProgress(context().activeItems)} 100`}
                stroke-linecap="round"
                transform="rotate(-90 18 18)"
              />
              <text
                x="18"
                y="18"
                text-anchor="middle"
                dominant-baseline="central"
                font-size="10"
                font-weight="600"
                fill="currentColor"
              >
                {getActiveIndex(context().activeItems) >= 0
                  ? getActiveIndex(context().activeItems) + 1
                  : '-'}
              </text>
            </svg>
            <span class={styles.triggerLabel}>{getActiveLabel(context().activeItems)}</span>
          </span>
          <CollapsibleIndicator />
        </CollapsibleTrigger>
      {/snippet}
    </TocContext>

    <CollapsibleContent>
      <TocList>
        <TocIndicator />
        {#each items as item (item.value)}
          <TocItem {item}>
            <TocLink href={`#${item.value}`}>{item.label}</TocLink>
          </TocItem>
        {/each}
      </TocList>
    </CollapsibleContent>
  </Collapsible>

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
</Toc>