import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
import styles from '@/components/examples/card/card-variants.module.css';

const variants = ['elevated', 'outline', 'subtle'] as const;
const descriptions = {
  elevated: 'Raised above nearby content.',
  outline: 'Separated with a visible border.',
  subtle: 'Grouped with a muted background.',
};

export default function CardVariantsDemo() {
  return (
    <div className={styles.root}>
      {variants.map((variant) => (
        <Card className={styles.card} key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>{descriptions[variant]}</CardDescription>
          </CardHeader>
          <CardBody>Use variants to communicate surface hierarchy.</CardBody>
        </Card>
      ))}
    </div>
  );
}