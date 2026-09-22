import { createListCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/react/listbox';
import { useState } from 'react';
import styles from '@/components/examples/listbox/listbox-controlled.module.css';

const sizes = createListCollection({
  items: [
    {
      label: 'Small',
      value: 'sm',
    },
    {
      label: 'Medium',
      value: 'md',
    },
    {
      label: 'Large',
      value: 'lg',
    },
    {
      label: 'Extra Large',
      value: 'xl',
    },
  ],
});

export default function ControlledListboxDemo() {
  const [value, setValue] = useState(['md']);
  return (
    <Listbox
      collection={sizes}
      className={styles.root}
      value={value}
      onValueChange={(details) => setValue(details.value)}
    >
      <ListboxLabel>Select size</ListboxLabel>
      <ListboxContent>
        {sizes.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}
