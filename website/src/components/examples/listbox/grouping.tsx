import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemGroup,
  ListboxItemGroupLabel,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-grouping.module.css';

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
      <ListboxLabel>Select region</ListboxLabel>
      <ListboxContent>
        {regions.group().map(([region, items]) => (
          <ListboxItemGroup key={region} id={region}>
            <ListboxItemGroupLabel>{region}</ListboxItemGroupLabel>
            {items.map((item) => (
              <ListboxItem key={item.value} item={item}>
                <ListboxItemText>{item.label}</ListboxItemText>
                <ListboxItemIndicator />
              </ListboxItem>
            ))}
          </ListboxItemGroup>
        ))}
      </ListboxContent>
    </Listbox>
  );
}