import { Card, CardBackground, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
import styles from '@/components/examples/card/card-with-background.module.css';

export default function CardWithBackgroundDemo() {
  return (
    <Card className={styles.root} variant="elevated">
      <CardBackground>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div aria-hidden="true" className={styles.overlay} />
      </CardBackground>
      <CardHeader className={styles.header}>
        <CardTitle>Weekend guide</CardTitle>
        <CardDescription className={styles.description}>
          Three places to slow down, look around, and stay a little longer.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}