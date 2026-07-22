import { Toggle } from '@moduix/react';
import styles from '@/components/examples/toggle.module.css';

export default function DisabledToggleDemo() {
  return (
    <div className={styles.row}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </div>
  );
}