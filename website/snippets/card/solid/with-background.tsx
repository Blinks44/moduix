import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-with-background.module.css';

export default function CardWithBackgroundDemo() {
  return (
    <Card class={styles.root} variant="elevated">
      <Card.Background>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div aria-hidden="true" class={styles.overlay} />
      </Card.Background>
      <Card.Header class={styles.header}>
        <Card.Title>Weekend guide</Card.Title>
        <Card.Description class={styles.description}>
          Three places to slow down, look around, and stay a little longer.
        </Card.Description>
      </Card.Header>
    </Card>
  );
}