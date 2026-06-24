import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarRootProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
};
type AvatarRootProviderProps = ComponentProps<typeof AvatarPrimitive.RootProvider> & {
  size?: AvatarSize;
};

const AvatarRoot = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  function AvatarRoot({ className, size, ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const AvatarRootProvider = forwardRef<
  ComponentRef<typeof AvatarPrimitive.RootProvider>,
  AvatarRootProviderProps
>(function AvatarRootProvider({ className, size, ...props }, ref) {
  return (
    <AvatarPrimitive.RootProvider
      ref={ref}
      data-slot="avatar-root-provider"
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  ComponentProps<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={clsx(styles.image, normalizeClassName(className))}
      {...props}
    />
  );
});

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentProps<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={clsx(styles.fallback, normalizeClassName(className))}
      {...props}
    />
  );
});

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Context: AvatarPrimitive.Context,
});

export { Avatar, useAvatar, useAvatarContext };
export type {
  AvatarContextProps,
  AvatarFallbackBaseProps,
  AvatarFallbackProps,
  AvatarImageBaseProps,
  AvatarImageProps,
  AvatarRootBaseProps,
  AvatarRootProviderBaseProps,
  AvatarStatusChangeDetails,
  UseAvatarContext,
  UseAvatarProps,
  UseAvatarReturn,
} from '@ark-ui/react/avatar';
export type { AvatarRootProps, AvatarRootProviderProps, AvatarSize };