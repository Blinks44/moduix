import { Card } from '@moduix/react/card';
import styles from '@/components/examples/card/card-with-background.module.css';

export default function CardWithBackgroundDemo() {
  return (
    <Card className={styles.root} variant="elevated">
      <Card.Background>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div aria-hidden="true" className={styles.overlay} />
      </Card.Background>
      <Card.Header className={styles.header}>
        <Card.Title>Weekend guide</Card.Title>
        <Card.Description className={styles.description}>
          Three places to slow down, look around, and stay a little longer.
        </Card.Description>
      </Card.Header>
    </Card>
  );
}