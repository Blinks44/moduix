import { SimpleGrid, Text } from '@moduix/react';
import styles from '@/components/examples/simple-grid.module.css';

const metrics = [
  {
    label: 'Users',
    value: '24.8k',
  },
  {
    label: 'Sessions',
    value: '91k',
  },
  {
    label: 'Conversion',
    value: '8.4%',
  },
  {
    label: 'Revenue',
    value: '$42k',
  },
];

export default function FixedColumnsDemo() {
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