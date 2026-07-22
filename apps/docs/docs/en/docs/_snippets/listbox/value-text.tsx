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
  ],
});

export default function ValueTextListboxDemo() {
  return (
    <Listbox collection={countries} className={styles.root} defaultValue={['ca']}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        {countries.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
      <Listbox.ValueText placeholder="No country selected" />
    </Listbox>
  );
}