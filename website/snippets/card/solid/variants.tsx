import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/solid/card';
import { For } from 'solid-js';
import styles from '@/components/examples/card/card-variants.module.css';

const variants = ['elevated', 'outline', 'subtle'] as const;
const descriptions = {
  elevated: 'Raised above nearby content.',
  outline: 'Separated with a visible border.',
  subtle: 'Grouped with a muted background.',
};

export default function CardVariantsDemo() {
  return (
    <div class={styles.root}>
      <For each={variants}>
        {(variant) => (
          <Card class={styles.card} variant={variant}>
            <CardHeader>
              <CardTitle>{variant}</CardTitle>
              <CardDescription>{descriptions[variant]}</CardDescription>
            </CardHeader>
            <CardBody>Use variants to communicate surface hierarchy.</CardBody>
          </Card>
        )}
      </For>
    </div>
  );
}