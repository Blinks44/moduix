import { Avatar, AvatarFallback, AvatarImage } from '@moduix/react/avatar';
import styles from '@/components/examples/avatar/avatar-status.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarStatusIndicatorDemo() {
  return (
    <Avatar size="lg">
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={avatarImage} alt="Alex T." />
      <span className={styles.status} role="img" aria-label="Online" />
    </Avatar>
  );
}