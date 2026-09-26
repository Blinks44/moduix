import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
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
} from '@moduix/react/combobox';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import styles from '@/components/examples/combobox/component-virtualized.module.css';

const results = Array.from({ length: 1000 }, (_, index) => ({
  label: `Result ${String(index + 1).padStart(4, '0')}`,
  value: `result-${index + 1}`,
}));

export default function VirtualizedComboboxDemo() {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter, reset } = useListCollection({
    initialItems: results,
    filter: contains,
  });
  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => scrollElement,
    estimateSize: () => 32,
    overscan: 8,
  });

  return (
    <Combobox
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      scrollToIndexFn={(details) => {
        flushSync(() => {
          virtualizer.scrollToIndex(details.index, {
            align: 'center',
            behavior: 'auto',
          });
        });
      }}
    >
      <ComboboxLabel>Large dataset</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Search 1,000 results" />
        <ComboboxTrigger aria-label="Open options" onClick={reset} />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent className={`${styles.content} ${styles.virtualContent}`}>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <div ref={setScrollElement} className={styles.virtualScroller}>
            <ComboboxList
              className={styles.virtualList}
              style={{ height: virtualizer.getTotalSize(), width: '100%' }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = collection.items[virtualItem.index];

                return (
                  <ComboboxItem
                    key={item.value}
                    item={item}
                    aria-setsize={collection.size}
                    aria-posinset={virtualItem.index + 1}
                    className={styles.virtualItem}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: virtualItem.size,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <ComboboxItemText>{item.label}</ComboboxItemText>
                    <ComboboxItemIndicator />
                  </ComboboxItem>
                );
              })}
            </ComboboxList>
          </div>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}