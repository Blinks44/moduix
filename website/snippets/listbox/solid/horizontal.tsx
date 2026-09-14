import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-horizontal.module.css';

const albums = createListCollection({
  items: [
    { title: 'Midnight Dreams', artist: 'Luna Ray' },
    { title: 'Neon Skyline', artist: 'The Electric' },
    { title: 'Acoustic Sessions', artist: 'Sarah Woods' },
    { title: 'Urban Echoes', artist: 'Metro Collective' },
    { title: 'Summer Vibes', artist: 'Coastal Waves' },
  ],
  itemToValue: (item) => item.title,
  itemToString: (item) => item.title,
});

export default function HorizontalListboxDemo() {
  return (
    <Listbox collection={albums} orientation="horizontal" class={styles.horizontalRoot}>
      <Listbox.Label>Select album</Listbox.Label>
      <Listbox.Content>
        <For each={albums.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>
                <Listbox.ItemTextContent class={styles.albumText}>
                  <Listbox.ItemTextLabel>{item.title}</Listbox.ItemTextLabel>
                  <span class={styles.artist}>{item.artist}</span>
                </Listbox.ItemTextContent>
              </Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
    </Listbox>
  );
}