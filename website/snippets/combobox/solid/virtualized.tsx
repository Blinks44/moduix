import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
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
      <Combobox.Label>Large dataset</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Search 1,000 results" />
        <Combobox.Trigger aria-label="Open options" onClick={reset} />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={`${styles.content} ${styles.virtualContent}`}>
          <Combobox.Empty>No results found.</Combobox.Empty>
          <div ref={setScrollElement} class={styles.virtualScroller}>
            <Combobox.List
              class={styles.virtualList}
              style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%' }}
            >
              <For each={virtualizer.getVirtualItems()}>
                {(virtualItem) => {
                  const item = () => collection().items[virtualItem.index];

                  return (
                    <Combobox.Item
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
                      <Combobox.ItemText>{item()?.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  );
                }}
              </For>
            </Combobox.List>
          </div>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}