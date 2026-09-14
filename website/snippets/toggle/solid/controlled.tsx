import { Toggle } from '@moduix/solid/toggle';
import { Bell as BellIcon } from 'lucide-solid';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/toggle/toggle-controlled.module.css';

export default function ControlledToggleDemo() {
  const [pressed, setPressed] = createSignal(false);

  return (
    <div class={styles.stack}>
      <Toggle pressed={pressed()} onPressedChange={setPressed}>
        <BellIcon />
        {pressed() ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <div data-preview-meta>
        <output>Notifications: {pressed() ? 'on' : 'off'}</output>
      </div>
    </div>
  );
}