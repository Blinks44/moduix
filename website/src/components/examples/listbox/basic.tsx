import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-basic.module.css';

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
    {
      label: 'Australia',
      value: 'au',
    },
    {
      label: 'Germany',
      value: 'de',
    },
    {
      label: 'France',
      value: 'fr',
    },
    {
      label: 'Japan',
      value: 'jp',
    },
  ],
});

export default function ListboxDemo() {
  return (
    <Listbox collection={countries} className={styles.root}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        {countries.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}