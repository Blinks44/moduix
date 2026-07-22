import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const albums = createListCollection({
  items: [
    {
      title: 'Midnight Dreams',
      artist: 'Luna Ray',
    },
    {
      title: 'Neon Skyline',
      artist: 'The Electric',
    },
    {
      title: 'Acoustic Sessions',
      artist: 'Sarah Woods',
    },
    {
      title: 'Urban Echoes',
      artist: 'Metro Collective',
    },
    {
      title: 'Summer Vibes',
      artist: 'Coastal Waves',
    },
  ],
  itemToValue: (item) => item.title,
  itemToString: (item) => item.title,
});

export default function HorizontalListboxDemo() {
  return (
    <Listbox collection={albums} orientation="horizontal" className={styles.horizontalRoot}>
      <Listbox.Label>Select album</Listbox.Label>
      <Listbox.Content>
        {albums.items.map((item) => (
          <Listbox.Item key={item.title} item={item}>
            <Listbox.ItemText>
              <Listbox.ItemTextContent className={styles.albumText}>
                <Listbox.ItemTextLabel>{item.title}</Listbox.ItemTextLabel>
                <span className={styles.artist}>{item.artist}</span>
              </Listbox.ItemTextContent>
            </Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}