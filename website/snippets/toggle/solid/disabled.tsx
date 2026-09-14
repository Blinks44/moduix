import { Toggle } from '@moduix/solid/toggle';
import styles from '@/components/examples/toggle/toggle-disabled.module.css';

export default function DisabledToggleDemo() {
  return (
    <div class={styles.row}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </div>
  );
}