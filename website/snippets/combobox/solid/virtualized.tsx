import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
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
} from '@moduix/solid/combobox';
import { createVirtualizer } from '@tanstack/solid-virtual';
import { For, createEffect, createSignal } from 'solid-js';
import styles from '@/components/examples/combobox/component-virtualized.module.css';

const results = Array.from({ length: 1000 }, (_, index) => ({
  label: `Result ${String(index + 1).padStart(4, '0')}`,
  value: `result-${index + 1}`,
}));

export default function VirtualizedComboboxDemo() {
  const [scrollElement, setScrollElement] = createSignal<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter, reset } = useListCollection({
    initialItems: results,
    filter: contains,
  });
  const virtualizer = createVirtualizer({
    count: collection().size,
    getScrollElement: () => scrollElement(),
    estimateSize: () => 32,
    overscan: 8,
  });

  createEffect(() => {
    virtualizer.setOptions({ ...virtualizer.options, count: collection().size });
  });

  return (
    <Combobox
      collection={collection()}
      onInputValueChange={(details) => filter(details.inputValue)}
      scrollToIndexFn={(details) => {
        virtualizer.scrollToIndex(details.index, {
          align: 'center',
          behavior: 'auto',
        });
      }}
    >
      <ComboboxLabel>Large dataset</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Search 1,000 results" />
        <ComboboxTrigger aria-label="Open options" onClick={reset} />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={`${styles.content} ${styles.virtualContent}`}>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <div ref={setScrollElement} class={styles.virtualScroller}>
            <ComboboxList
              class={styles.virtualList}
              style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%' }}
            >
              <For each={virtualizer.getVirtualItems()}>
                {(virtualItem) => {
                  const item = () => collection().items[virtualItem.index];

                  return (
                    <ComboboxItem
                      item={item()}
                      aria-setsize={collection().size}
                      aria-posinset={virtualItem.index + 1}
                      class={styles.virtualItem}
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <ComboboxItemText>{item()?.label}</ComboboxItemText>
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  );
                }}
              </For>
            </ComboboxList>
          </div>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}