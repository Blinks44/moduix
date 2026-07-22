import { Toggle } from '@moduix/react';
import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from 'lucide-react';
import styles from '@/components/examples/toggle.module.css';

export default function ToggleIconsDemo() {
  return (
    <div className={styles.row}>
      <Toggle variant="outline">
        <BellIcon />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
        <CheckIcon />
      </Toggle>
    </div>
  );
}