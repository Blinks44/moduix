import { Toggle } from '@moduix/react/toggle';
import styles from '@/components/examples/toggle.module.css';

export default function ToggleVariantsDemo() {
  return (
    <div className={styles.row}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  );
}