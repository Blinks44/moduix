import { Toggle } from '@moduix/react';
import styles from '@/components/examples/toggle.module.css';

export default function ToggleSizesDemo() {
  return (
    <div className={styles.row}>
      <Toggle size="xs">Extra-small</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}