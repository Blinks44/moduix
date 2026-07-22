import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { flushSync } from 'react-dom';

const results = Array.from({ length: 1000 }, (_, index) => ({
  label: `Result ${String(index + 1).padStart(4, '0')}`,
  value: `result-${index + 1}`,
}));

export default function VirtualizedComboboxDemo() {
  const scrollRef = useRef(null as HTMLDivElement | null);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter, reset } = useListCollection({
    initialItems: results,
    filter: contains,
  });
  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => scrollRef.current,
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
      <Combobox.Label>Large dataset</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Search 1,000 results" />
        <Combobox.Trigger aria-label="Open options" onClick={reset} />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content className="virtualContent">
          <Combobox.Empty>No results found.</Combobox.Empty>
          <div ref={scrollRef} className="virtualScroller">
            <Combobox.List
              className="virtualList"
              style={{ height: virtualizer.getTotalSize(), width: '100%' }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = collection.items[virtualItem.index];

                return (
                  <Combobox.Item
                    key={item.value}
                    item={item}
                    aria-setsize={collection.size}
                    aria-posinset={virtualItem.index + 1}
                    className="virtualItem"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: virtualItem.size,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <Combobox.ItemText>{item.label}</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                );
              })}
            </Combobox.List>
          </div>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}