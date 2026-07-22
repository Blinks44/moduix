import { Toggle } from '@moduix/react';
import { Bell as BellIcon } from 'lucide-react';
import { useState } from 'react';
import styles from '@/components/examples/toggle.module.css';

export default function ControlledToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className={styles.stack}>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <BellIcon />
        {pressed ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <span className={styles.hint}>Current value: {String(pressed)}</span>
    </div>
  );
}