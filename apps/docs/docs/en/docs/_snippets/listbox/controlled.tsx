import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import { useState } from 'react';
import styles from '@/components/examples/listbox.module.css';

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
      <Listbox.Label>Select size</Listbox.Label>
      <Listbox.Content>
        {sizes.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}