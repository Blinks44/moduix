import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea/textarea-sizes.module.css';

export default function TextareaSizesDemo() {
  return (
    <div className={styles.root}>
      <Textarea size="xs" aria-label="Extra-small textarea" placeholder="Extra-small textarea" />
      <Textarea size="sm" aria-label="Small textarea" placeholder="Small textarea" />
      <Textarea size="md" aria-label="Medium textarea" placeholder="Medium textarea" />
      <Textarea size="lg" aria-label="Large textarea" placeholder="Large textarea" />
      <Textarea size="xl" aria-label="Extra-large textarea" placeholder="Extra-large textarea" />
    </div>
  );
}