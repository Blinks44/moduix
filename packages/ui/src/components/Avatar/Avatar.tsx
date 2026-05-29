import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Avatar.module.css';

function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={mergeClassName(className, styles.image)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={mergeClassName(className, styles.fallback)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };