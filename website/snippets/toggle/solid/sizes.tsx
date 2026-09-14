import { Toggle } from '@moduix/solid/toggle';
import styles from '@/components/examples/toggle/toggle-sizes.module.css';

export default function ToggleSizesDemo() {
  return (
    <div class={styles.row}>
      <Toggle size="xs">Extra-small</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}