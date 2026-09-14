import { Card } from '@moduix/solid/card';
import { For } from 'solid-js';
import styles from '@/components/examples/card/card-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const descriptions = {
  sm: 'Compact supporting content.',
  md: 'Default product content.',
  lg: 'Prominent standalone content.',
};

export default function CardSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {(size) => (
          <Card class={styles.card} size={size}>
            <Card.Header>
              <Card.Title>Card {size}</Card.Title>
              <Card.Description>{descriptions[size]}</Card.Description>
            </Card.Header>
            <Card.Body>Shared content with size-specific density.</Card.Body>
          </Card>
        )}
      </For>
    </div>
  );
}