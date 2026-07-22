import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const regions = createListCollection({
  items: [
    {
      label: 'New York',
      value: 'nyc',
      region: 'North America',
    },
    {
      label: 'Los Angeles',
      value: 'lax',
      region: 'North America',
    },
    {
      label: 'Toronto',
      value: 'yyz',
      region: 'North America',
    },
    {
      label: 'London',
      value: 'lhr',
      region: 'Europe',
    },
    {
      label: 'Paris',
      value: 'cdg',
      region: 'Europe',
    },
    {
      label: 'Berlin',
      value: 'ber',
      region: 'Europe',
    },
    {
      label: 'Tokyo',
      value: 'nrt',
      region: 'Asia Pacific',
    },
    {
      label: 'Singapore',
      value: 'sin',
      region: 'Asia Pacific',
    },
    {
      label: 'Sydney',
      value: 'syd',
      region: 'Asia Pacific',
    },
  ],
  groupBy: (item) => item.region,
});

export default function GroupedListboxDemo() {
  return (
    <Listbox collection={regions} className={styles.root}>
      <Listbox.Label>Select region</Listbox.Label>
      <Listbox.Content>
        {regions.group().map(([region, items]) => (
          <Listbox.ItemGroup key={region} id={region}>
            <Listbox.ItemGroupLabel>{region}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item key={item.value} item={item}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}