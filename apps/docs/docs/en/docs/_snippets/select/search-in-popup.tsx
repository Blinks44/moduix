import { createListCollection } from '@ark-ui/react/collection';
import { InputGroup, Select } from '@moduix/react';
import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
  ],
});

export default function SelectSearchInPopupDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const collection = createListCollection({
    items: fruits.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
  });

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <Select
      collection={collection}
      open={open}
      lazyMount
      unmountOnExit
      onOpenChange={(details) => {
        setOpen(details.open);

        if (!details.open) {
          setQuery('');
        }
      }}
      onFocusOutside={(event) => {
        if (
          event.detail.target instanceof Node &&
          popupRef.current?.contains(event.detail.target)
        ) {
          event.preventDefault();
        }
      }}
      onInteractOutside={(event) => {
        if (
          event.detail.target instanceof Node &&
          popupRef.current?.contains(event.detail.target)
        ) {
          event.preventDefault();
        }
      }}
    >
      <Select.Label>Choose fruit</Select.Label>
      <Select.Field placeholder="Search or select a fruit" clearLabel="Clear selection" />
      <Select.Positioner>
        <div ref={popupRef} className="select-search-popup">
          <div className="select-search-popup-header">
            <InputGroup>
              <InputGroup.Addon>
                <SearchIcon aria-hidden />
              </InputGroup.Addon>
              <InputGroup.Input
                aria-label="Filter fruits"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter fruits"
              />
            </InputGroup>
          </div>
          <Select.Content className="select-search-popup-content">
            {collection.items.length ? (
              collection.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))
            ) : (
              <div className="select-search-popup-empty" role="presentation">
                No fruits found.
              </div>
            )}
          </Select.Content>
        </div>
      </Select.Positioner>
    </Select>
  );
}