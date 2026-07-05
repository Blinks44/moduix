//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';
import { useState } from 'react';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export function MultipleComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });
  const [value, setValue] = useState<string[]>([]);
  const selectedItems = fruits.filter((item) => value.includes(item.value));

  return (
    <Combobox
      collection={collection}
      value={value}
      onValueChange={(details) => setValue(details.value)}
      onInputValueChange={(details) => filter(details.inputValue)}
      multiple
    >
      <Combobox.Label>Fruits</Combobox.Label>
      <div className="tags">
        {selectedItems.length === 0 ? <span className="note">None selected</span> : null}
        {selectedItems.map((item) => (
          <span key={item.value} className="tag">
            {item.label}
          </span>
        ))}
      </div>
      <Combobox.Control>
        <Combobox.Input placeholder="Search fruits" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion