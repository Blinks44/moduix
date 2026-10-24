import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center rounded-full bg-muted align-middle leading-none font-medium text-foreground select-none',
  {
    variants: {
      size: {
        xs: 'size-control-xs text-xs',
        sm: 'size-control-sm text-sm',
        md: 'size-control-md text-md',
        lg: 'size-control-lg text-lg',
        xl: 'size-control-xl text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

type AvatarRootProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
};
type AvatarGroupProps = HTMLArkProps<'div'>;
type AvatarRootProviderProps = ComponentProps<typeof AvatarPrimitive.RootProvider> & {
  size?: AvatarSize;
};

const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  function Avatar({ className, size = 'md', ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
        data-size={size}
        data-slot="avatar-root"
      />
    );
  },
);

const AvatarRootProvider = forwardRef<
  ComponentRef<typeof AvatarPrimitive.RootProvider>,
  AvatarRootProviderProps
>(function AvatarRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <AvatarPrimitive.RootProvider
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
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
      className={cn(
        'block size-full rounded-[inherit] object-cover data-[state=hidden]:hidden',
        className,
      )}
      {...props}
      data-slot="avatar-image"
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
      className={cn(
        'inline-flex size-full items-center justify-center overflow-hidden rounded-[inherit] data-[state=hidden]:hidden',
        className,
      )}
      {...props}
      data-slot="avatar-fallback"
    />
  );
});

const AvatarGroup = forwardRef<ComponentRef<typeof ark.div>, AvatarGroupProps>(function AvatarGroup(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      className={cn(
        'flex items-center *:not-first:-ms-2 *:data-[scope=avatar]:ring-2 *:data-[scope=avatar]:ring-background',
        className,
      )}
      {...props}
      data-slot="avatar-group"
    />
  );
});

const AvatarContext = AvatarPrimitive.Context;

export {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
};
export type { AvatarGroupProps, AvatarRootProps, AvatarRootProviderProps, AvatarSize };