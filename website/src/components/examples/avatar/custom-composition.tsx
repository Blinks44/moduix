import { Avatar } from '@moduix/react/avatar';
import styles from '@/components/examples/avatar/avatar-custom-composition.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarLinkDemo() {
  return (
    <Avatar asChild size="xl" className={styles.root}>
      <a href="mailto:alex@example.com" aria-label="Email Alex T.">
        <Avatar.Fallback className={styles.fallback} name="Alex T." />
        <Avatar.Image className={styles.image} src={avatarImage} alt="" />
      </a>
    </Avatar>
  );
}