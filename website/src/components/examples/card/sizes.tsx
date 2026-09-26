import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
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
          <CardHeader>
            <CardTitle>Card {size}</CardTitle>
            <CardDescription>{descriptions[size]}</CardDescription>
          </CardHeader>
          <CardBody>Shared content with size-specific density.</CardBody>
        </Card>
      ))}
    </div>
  );
}