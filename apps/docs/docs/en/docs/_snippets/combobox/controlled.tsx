import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export default function ControlledComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });
  const [value, setValue] = useState(['mango']);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Combobox
        collection={collection}
        value={value}
        onInputValueChange={(details) => filter(details.inputValue)}
        onValueChange={(details) => setValue(details.value)}
      >
        <Combobox.Label>Choose fruit</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No fruits found.</Combobox.Empty>
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Option key={item.value} item={item}>
                  {item.label}
                </Combobox.Option>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox>
      <PreviewMeta>
        <output>Selected: {value[0] ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}