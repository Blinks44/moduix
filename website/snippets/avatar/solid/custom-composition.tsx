import { Avatar, AvatarFallback, AvatarImage } from '@moduix/solid/avatar';
import styles from '@/components/examples/avatar/avatar-custom-composition.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export default function AvatarLinkDemo() {
  return (
    <Avatar
      asChild={(props) => (
        <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex T.">
          <AvatarFallback class={styles.fallback}>AT</AvatarFallback>
          <AvatarImage class={styles.image} src={avatarImage} alt="" />
        </a>
      )}
      size="xl"
      class={styles.root}
    />
  );
}