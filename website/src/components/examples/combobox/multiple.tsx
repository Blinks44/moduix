import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import {
  Combobox,
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
import styles from '@/components/examples/combobox/component-multiple.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export default function MultipleComboboxDemo() {
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
      <ComboboxLabel>Fruits</ComboboxLabel>
      <div className={styles.tags}>
        {selectedItems.length === 0 ? <span className={styles.note}>None selected</span> : null}
        {selectedItems.map((item) => (
          <span key={item.value} className={styles.tag}>
            {item.label}
          </span>
        ))}
      </div>
      <ComboboxControl>
        <ComboboxInput placeholder="Search fruits" />
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
  );
}