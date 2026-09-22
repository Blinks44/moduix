import { createGridCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemText, ListboxLabel } from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-grid.module.css';

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
      <ListboxLabel>Pick a color</ListboxLabel>
      <ListboxContent>
        {colors.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}
