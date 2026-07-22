import { createGridCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const colors = createGridCollection({
  items: [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ],
  columnCount: 3,
});

export default function GridListboxDemo() {
  return (
    <Listbox collection={colors} className={styles.gridRoot}>
      <Listbox.Label>Pick a color</Listbox.Label>
      <Listbox.Content>
        {colors.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}