import { Toggle } from '@moduix/react/toggle';
import { Bell as BellIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toggle.module.css';

export default function ControlledToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className={styles.stack}>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <BellIcon />
        {pressed ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <PreviewMeta>
        <output>Notifications: {pressed ? 'on' : 'off'}</output>
      </PreviewMeta>
    </div>
  );
}