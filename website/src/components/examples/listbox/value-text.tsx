import { createListCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel, ListboxValueText } from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-value-text.module.css';

const countries = createListCollection({
  items: [
    {
      label: 'United States',
      value: 'us',
    },
    {
      label: 'United Kingdom',
      value: 'uk',
    },
    {
      label: 'Canada',
      value: 'ca',
    },
  ],
});

export default function ValueTextListboxDemo() {
  return (
    <Listbox collection={countries} className={styles.root} defaultValue={['ca']}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        {countries.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
      <ListboxValueText placeholder="No country selected" />
    </Listbox>
  );
}
