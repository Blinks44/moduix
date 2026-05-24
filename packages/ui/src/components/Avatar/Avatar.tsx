import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: AvatarSize;
};
type AvatarState = AvatarPrimitive.Root.State;

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  function Avatar({ className, size = 'md', ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar-root"
        data-size={size}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    );
  },
);

type AvatarImageProps = AvatarPrimitive.Image.Props;
type AvatarImageState = AvatarPrimitive.Image.State;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={mergeClassName(className, styles.image)}
      {...props}
    />
  );
});

type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;
type AvatarFallbackState = AvatarPrimitive.Fallback.State;
type AvatarImageLoadingStatus = AvatarImageState['imageLoadingStatus'];

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={mergeClassName(className, styles.fallback)}
      {...props}
    />
  );
});

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