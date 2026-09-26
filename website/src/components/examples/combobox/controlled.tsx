import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/combobox/component-controlled.module.css';

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
    <div className={styles.stack}>
      <Combobox
        collection={collection}
        value={value}
        onInputValueChange={(details) => filter(details.inputValue)}
        onValueChange={(details) => setValue(details.value)}
      >
        <ComboboxLabel>Choose fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPositioner>
          <ComboboxContent className={styles.content}>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {collection.items.map((item) => (
                <ComboboxOption key={item.value} item={item}>
                  {item.label}
                </ComboboxOption>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
      <PreviewMeta>
        <output>Selected: {value[0] ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}