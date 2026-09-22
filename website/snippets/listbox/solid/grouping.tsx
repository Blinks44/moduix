import { createListCollection } from '@ark-ui/solid/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemGroup,
  ListboxItemGroupLabel,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-grouping.module.css';

const regions = createListCollection({
  items: [
    { label: 'New York', value: 'nyc', region: 'North America' },
    { label: 'Los Angeles', value: 'lax', region: 'North America' },
    { label: 'Toronto', value: 'yyz', region: 'North America' },
    { label: 'London', value: 'lhr', region: 'Europe' },
    { label: 'Paris', value: 'cdg', region: 'Europe' },
    { label: 'Berlin', value: 'ber', region: 'Europe' },
    { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
    { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
    { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
  ],
  groupBy: (item) => item.region,
});

export default function GroupedListboxDemo() {
  return (
    <Listbox collection={regions} class={styles.root}>
      <ListboxLabel>Select region</ListboxLabel>
      <ListboxContent>
        <For each={regions.group()}>
          {([region, items]) => (
            <ListboxItemGroup id={region}>
              <ListboxItemGroupLabel>{region}</ListboxItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <ListboxItem item={item}>
                    <ListboxItemText>{item.label}</ListboxItemText>
                    <ListboxItemIndicator />
                  </ListboxItem>
                )}
              </For>
            </ListboxItemGroup>
          )}
        </For>
      </ListboxContent>
    </Listbox>
  );
}