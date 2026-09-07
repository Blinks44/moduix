import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-advanced-customization.module.css';

export default function CardAdvancedCustomizationDemo() {
  return (
    <Card class={styles.root}>
      <div class={styles.media}>
        <img
          class={styles.image}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80"
          alt="A warehouse with neatly stacked delivery boxes."
        />
      </div>
      <Card.Header>
        <Card.Title asChild={(props) => <h2 {...props()}>System load</h2>} />
        <Card.Description>Bypasses `Card.Media` to fully control media framing.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.metric}>
          <span>64%</span>
          <div class={styles.progress}>
            <div class={styles.progressValue} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}