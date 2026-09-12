import { Toggle } from '@moduix/solid/toggle';
import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from 'lucide-solid';
import styles from '@/components/examples/toggle/toggle-icons.module.css';

export default function ToggleIconsDemo() {
  return (
    <div class={styles.row}>
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