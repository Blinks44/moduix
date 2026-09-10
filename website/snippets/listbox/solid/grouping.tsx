import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
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
      <Listbox.Label>Select region</Listbox.Label>
      <Listbox.Content>
        <For each={regions.group()}>
          {([region, items]) => (
            <Listbox.ItemGroup id={region}>
              <Listbox.ItemGroupLabel>{region}</Listbox.ItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <Listbox.Item item={item}>
                    <Listbox.ItemText>{item.label}</Listbox.ItemText>
                    <Listbox.ItemIndicator />
                  </Listbox.Item>
                )}
              </For>
            </Listbox.ItemGroup>
          )}
        </For>
      </Listbox.Content>
    </Listbox>
  );
}