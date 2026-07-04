/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SimpleGrid, Text } from '@moduix/react';
import styles from './simple-grid.module.css';

const destinations = [
  {
    name: 'Alpine lake',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  // Add more destinations using the same shape.
];

export function MediaGalleryDemo() {
  return (
    <SimpleGrid
      asChild
      minChildWidth="10rem"
      gap="var(--spacing-3)"
      className={`${styles.simpleGridDemoGrid} ${styles.simpleGridDemoGallery}`}
    >
      <ul aria-label="Travel destinations">
        {destinations.map((destination) => (
          <li key={destination.name} className={styles.simpleGridDemoGalleryItem}>
            <img
              src={destination.image}
              alt={destination.alt}
              loading="lazy"
              className={styles.simpleGridDemoImage}
            />
            <Text as="span" size="sm" weight="medium" className={styles.simpleGridDemoCaption}>
              {destination.name}
            </Text>
          </li>
        ))}
      </ul>
    </SimpleGrid>
  );
}

//#endregion