import { Avatar, useAvatar } from '@moduix/solid/avatar';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/avatar/avatar-root-provider.module.css';

const avatarImages = [
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&dpr=2&q=80',
];

export default function AvatarRootProviderDemo() {
  const [imageIndex, setImageIndex] = createSignal(0);
  const avatar = useAvatar();

  return (
    <div class={styles.root}>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>AT</Avatar.Fallback>
        <Avatar.Image src={avatarImages[imageIndex()]} alt="Alex T." />
      </Avatar.RootProvider>
      <button
        type="button"
        onClick={() => setImageIndex((value) => (value + 1) % avatarImages.length)}
      >
        Change avatar
      </button>
    </div>
  );
}