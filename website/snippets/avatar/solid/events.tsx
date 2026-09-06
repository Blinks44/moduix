import { Avatar } from '@moduix/solid/avatar';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/avatar/avatar-events.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusDemo() {
  const [status, setStatus] = createSignal('idle');

  return (
    <div class={styles.root}>
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback>AT</Avatar.Fallback>
        <Avatar.Image src={avatarImage} alt="Alex T." />
      </Avatar>
      <output>Status: {status()}</output>
    </div>
  );
}