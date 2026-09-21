import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import styles from '@/components/examples/card/card-advanced-customization.module.css';

export default function CardAdvancedCustomizationDemo() {
  return (
    <Card className={styles.root}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80"
          alt="A warehouse with neatly stacked delivery boxes."
        />
      </div>
      <CardHeader>
        <CardTitle asChild>
          <h2>System load</h2>
        </CardTitle>
        <CardDescription>Bypasses `CardMedia` to fully control media framing.</CardDescription>
      </CardHeader>
      <CardBody>
        <div className={styles.metric}>
          <span>64%</span>
          <div className={styles.progress}>
            <div className={styles.progressValue} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}