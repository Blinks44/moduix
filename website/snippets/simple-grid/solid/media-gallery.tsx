import { SimpleGrid } from '@moduix/solid/simple-grid';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/simple-grid/simple-grid-media-gallery.module.css';

const destinations = [
  {
    name: 'Alpine lake',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    name: 'Coastal trail',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80',
    alt: 'Ocean waves beside a sandy coastal trail.',
  },
  {
    name: 'Forest cabin',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=640&q=80',
    alt: 'A small cabin surrounded by green forest.',
  },
];

export default function MediaGalleryDemo() {
  return (
    <SimpleGrid
      asChild={(props) => (
        <ul {...props()} aria-label="Travel destinations">
          {destinations.map((destination) => (
            <li class={styles.item}>
              <img
                src={destination.image}
                alt={destination.alt}
                loading="lazy"
                class={styles.image}
              />
              <Text as="span" size="sm" weight="medium" class={styles.caption}>
                {destination.name}
              </Text>
            </li>
          ))}
        </ul>
      )}
      minChildWidth="10rem"
      gap="var(--moduix-spacing-3)"
      class={styles.root}
    />
  );
}