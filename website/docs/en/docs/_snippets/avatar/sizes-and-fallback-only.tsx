import { Avatar } from '@moduix/react/avatar';
import styles from '@/components/examples/avatar-sizes-and-fallback-only.module.css';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function AvatarSizesDemo() {
  return (
    <div className={styles.root}>
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  );
}