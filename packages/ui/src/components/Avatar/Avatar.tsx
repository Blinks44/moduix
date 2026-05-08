import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: AvatarSize;
};

function Avatar({ className, size = 'md', ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar-root"
      data-size={size}
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

type AvatarImageProps = AvatarPrimitive.Image.Props;
type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

export { Avatar, AvatarImage, AvatarFallback };

export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarSize };