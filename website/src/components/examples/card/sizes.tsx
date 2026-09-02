import { Card } from '@moduix/react/card';
import styles from '@/components/examples/card/card-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const descriptions = {
  sm: 'Compact supporting content.',
  md: 'Default product content.',
  lg: 'Prominent standalone content.',
};

export default function CardSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map((size) => (
        <Card className={styles.card} key={size} size={size}>
          <Card.Header>
            <Card.Title>Card {size}</Card.Title>
            <Card.Description>{descriptions[size]}</Card.Description>
          </Card.Header>
          <Card.Body>Shared content with size-specific density.</Card.Body>
        </Card>
      ))}
    </div>
  );
}