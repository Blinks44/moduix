import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

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
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        {countries.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}