import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarVariants = cva(
  'relative box-border inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle font-medium text-foreground select-none',
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
        className={cn(avatarVariants({ size }), className)}
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
      className={cn(avatarVariants({ size }), className)}
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
      className={cn(
        'block size-full rounded-[inherit] object-cover object-center data-[state=hidden]:hidden',
        className,
      )}
      {...props}
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
      data-slot="avatar-fallback"
      className={cn(
        'box-border inline-flex size-full items-center justify-center rounded-[inherit] bg-[inherit] p-0 leading-[inherit] text-inherit data-[state=hidden]:hidden',
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Context: AvatarPrimitive.Context,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { Avatar, useAvatar, useAvatarContext };