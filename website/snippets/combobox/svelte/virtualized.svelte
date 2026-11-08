<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemText,
    ComboboxLabel,
    ComboboxList,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';
  import { createVirtualizer } from '@tanstack/svelte-virtual';
  import { untrack } from 'svelte';
  import styles from '@/components/examples/combobox/component-virtualized.module.css';

  const results = Array.from({ length: 1000 }, (_, index) => ({
    label: `Result ${String(index + 1).padStart(4, '0')}`,
    value: `result-${index + 1}`,
  }));
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter, reset } = useListCollection({
    initialItems: results,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
  let scrollElement = $state<HTMLDivElement | null>(null);
  const virtualizer = createVirtualizer<HTMLDivElement, Element>({
    count: results.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 32,
    overscan: 8,
  });
  $effect(() => {
    const count = collection().size;
    untrack(() => $virtualizer.setOptions({ count }));
  });
  const virtualItems = $derived(
    $virtualizer.getVirtualItems().flatMap((virtualItem) => {
      const item = collection().items[virtualItem.index];
      return item ? [{ item, virtualItem }] : [];
    }),
  );
</script>

<Combobox
  collection={collection()}
  scrollToIndexFn={({ index }) =>
    $virtualizer.scrollToIndex(index, { align: 'center', behavior: 'auto' })}
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Large dataset</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="Search 1,000 results" />
    <ComboboxTrigger aria-label="Open options" onclick={reset} />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent class={styles.virtualContent}>
      <ComboboxEmpty>No results found.</ComboboxEmpty>
      <div bind:this={scrollElement} class={styles.virtualScroller}>
        <ComboboxList
          class={styles.virtualList}
          style={`height: ${$virtualizer.getTotalSize()}px; width: 100%`}
        >
          {#each virtualItems as { item, virtualItem } (item.value)}
            <ComboboxItem
              {item}
              aria-setsize={collection().size}
              aria-posinset={virtualItem.index + 1}
              style={`position: absolute; top: 0; left: 0; right: 0; height: ${virtualItem.size}px; transform: translateY(${virtualItem.start}px)`}
            >
              <ComboboxItemText>{item.label}</ComboboxItemText>
              <ComboboxItemIndicator />
            </ComboboxItem>
          {/each}
        </ComboboxList>
      </div>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>