import { Avatar } from '@moduix/solid/avatar';
import { For } from 'solid-js';
import styles from '@/components/examples/avatar/avatar-sizes-and-fallback-only.module.css';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function AvatarSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={avatarSizes}>
        {(size) => (
          <Avatar size={size}>
            <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
          </Avatar>
        )}
      </For>
    </div>
  );
}