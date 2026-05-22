import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: AvatarSize;
};
type AvatarState = AvatarPrimitive.Root.State;

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

type AvatarImageProps = AvatarPrimitive.Image.Props;
type AvatarImageState = AvatarPrimitive.Image.State;

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={mergeClassName(className, styles.image)}
      {...props}
    />
  );
}

type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;
type AvatarFallbackState = AvatarPrimitive.Fallback.State;
type AvatarImageLoadingStatus = AvatarImageState['imageLoadingStatus'];

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

export type {
  AvatarProps,
  AvatarState,
  AvatarImageProps,
  AvatarImageState,
  AvatarFallbackProps,
  AvatarFallbackState,
  AvatarImageLoadingStatus,
  AvatarSize,
};