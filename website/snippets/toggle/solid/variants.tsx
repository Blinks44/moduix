import { Toggle } from '@moduix/solid/toggle';
import styles from '@/components/examples/toggle/toggle-variants.module.css';

export default function ToggleVariantsDemo() {
  return (
    <div class={styles.row}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  );
}