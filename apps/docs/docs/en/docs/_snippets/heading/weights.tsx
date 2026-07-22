import { Heading } from '@moduix/react';
import styles from '@/components/examples/heading.module.css';

const headingWeights = [
  {
    weight: 'regular',
    label: 'Regular weight',
  },
  {
    weight: 'medium',
    label: 'Medium weight',
  },
  {
    weight: 'semibold',
    label: 'Semibold weight',
  },
  {
    weight: 'bold',
    label: 'Bold weight',
  },
] as const;

export default function HeadingWeightsDemo() {
  return (
    <div className={styles.stack}>
      {headingWeights.map((item) => (
        <Heading key={item.weight} as="h2" weight={item.weight}>
          {item.label}
        </Heading>
      ))}
    </div>
  );
}