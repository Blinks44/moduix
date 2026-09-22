import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxItemTextContent,
  ListboxItemTextLabel,
  ListboxLabel,
} from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-horizontal.module.css';

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
      <ListboxLabel>Select album</ListboxLabel>
      <ListboxContent>
        {albums.items.map((item) => (
          <ListboxItem key={item.title} item={item}>
            <ListboxItemText>
              <ListboxItemTextContent className={styles.albumText}>
                <ListboxItemTextLabel>{item.title}</ListboxItemTextLabel>
                <span className={styles.artist}>{item.artist}</span>
              </ListboxItemTextContent>
            </ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}