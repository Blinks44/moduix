import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarRootProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
};
type AvatarRootProviderProps = ComponentProps<typeof AvatarPrimitive.RootProvider> & {
  size?: AvatarSize;
};

const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  function Avatar({ className, size, ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-size={size}
        className={clsx(styles.root, className)}
        {...props}
        data-slot="avatar-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="avatar-root-provider"
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
      className={clsx(styles.image, className)}
      {...props}
      data-slot="avatar-image"
    />
  );
});

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentProps<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ children, className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={clsx(styles.fallback, className)}
      {...props}
      data-slot="avatar-fallback"
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});

const AvatarContext = AvatarPrimitive.Context;

export {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
};