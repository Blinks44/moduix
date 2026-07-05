import { Card, SimpleGrid, Text } from '@moduix/react';
import styles from './simple-grid.module.css';

const plans = [
  {
    name: 'Starter',
    description: 'For personal projects and early prototypes.',
    price: 'Free',
  },
  {
    name: 'Team',
    description: 'Shared workflows for growing product teams.',
    price: '$24',
  },
  {
    name: 'Scale',
    description: 'Advanced controls for larger organizations.',
    price: '$64',
  },
  {
    name: 'Enterprise',
    description: 'Custom security, support, and deployment.',
    price: 'Custom',
  },
];

const metrics = [
  { label: 'Users', value: '24.8k' },
  { label: 'Sessions', value: '91k' },
  { label: 'Conversion', value: '8.4%' },
  { label: 'Revenue', value: '$42k' },
];

const destinations = [
  {
    name: 'Alpine lake',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    name: 'Ocean coast',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    name: 'Hillside town',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=640&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    name: 'Misty forest',
    image:
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=640&q=80',
    alt: 'A misty green forest with tall trees.',
  },
  {
    name: 'Desert light',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80',
    alt: 'Golden sand dunes under a bright sky.',
  },
  {
    name: 'Mountain trail',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=640&q=80',
    alt: 'A quiet alpine lake surrounded by trees.',
  },
];

export const simpleGridPlansData = `const plans = [
  {
    name: 'Starter',
    description: 'For personal projects and early prototypes.',
    price: 'Free',
  },
  {
    name: 'Team',
    description: 'Shared workflows for growing product teams.',
    price: '$24',
  },
  {
    name: 'Scale',
    description: 'Advanced controls for larger organizations.',
    price: '$64',
  },
  {
    name: 'Enterprise',
    description: 'Custom security, support, and deployment.',
    price: 'Custom',
  },
];`;

export const simpleGridMetricsData = `const metrics = [
  { label: 'Users', value: '24.8k' },
  { label: 'Sessions', value: '91k' },
  { label: 'Conversion', value: '8.4%' },
  { label: 'Revenue', value: '$42k' },
];`;

export const simpleGridDestinationsData = `const destinations = [
  {
    name: 'Alpine lake',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  // Add more destinations using the same shape.
];`;

export function SimpleGridExample() {
  return (
    <SimpleGrid
      minChildWidth="18rem"
      gap="var(--spacing-4)"
      className={`${styles.simpleGridDemoGrid} ${styles.simpleGridDemoCards}`}
    >
      {plans.map((plan) => (
        <Card key={plan.name} size="sm">
          <Card.Header>
            <Card.Title>{plan.name}</Card.Title>
            <Card.Description>{plan.description}</Card.Description>
          </Card.Header>
          <Card.Body>
            <Text size="xl" weight="semibold">
              {plan.price}
            </Text>
          </Card.Body>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export function SimpleGridColumnsExample() {
  return (
    <SimpleGrid
      columns={4}
      gap="var(--spacing-3)"
      className={`${styles.simpleGridDemoGrid} ${styles.simpleGridDemoMetrics}`}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.simpleGridDemoMetric}>
          <Text size="xl" weight="semibold">
            {metric.value}
          </Text>
          <Text tone="muted" size="sm">
            {metric.label}
          </Text>
        </div>
      ))}
    </SimpleGrid>
  );
}

export function SimpleGridSemanticExample() {
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