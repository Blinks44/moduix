import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
        className={cn(
          'relative box-border inline-flex size-[var(--moduix-size-md)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle text-[length:var(--moduix-text-md)] leading-[var(--moduix-line-height-text-md)] font-medium text-foreground select-none data-[size=lg]:size-[var(--moduix-size-lg)] data-[size=lg]:text-[length:var(--moduix-text-lg)] data-[size=lg]:leading-[var(--moduix-line-height-text-lg)] data-[size=sm]:size-[var(--moduix-size-sm)] data-[size=sm]:text-[length:var(--moduix-text-sm)] data-[size=sm]:leading-[var(--moduix-line-height-text-sm)] data-[size=xl]:size-[var(--moduix-size-xl)] data-[size=xl]:text-[length:var(--moduix-text-lg)] data-[size=xl]:leading-[var(--moduix-line-height-text-lg)] data-[size=xs]:size-[var(--moduix-size-xs)] data-[size=xs]:text-[length:var(--moduix-text-xs)] data-[size=xs]:leading-[var(--moduix-line-height-text-xs)]',
          className,
        )}
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
      className={cn(
        'relative box-border inline-flex size-[var(--moduix-size-md)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle text-[length:var(--moduix-text-md)] leading-[var(--moduix-line-height-text-md)] font-medium text-foreground select-none data-[size=lg]:size-[var(--moduix-size-lg)] data-[size=lg]:text-[length:var(--moduix-text-lg)] data-[size=lg]:leading-[var(--moduix-line-height-text-lg)] data-[size=sm]:size-[var(--moduix-size-sm)] data-[size=sm]:text-[length:var(--moduix-text-sm)] data-[size=sm]:leading-[var(--moduix-line-height-text-sm)] data-[size=xl]:size-[var(--moduix-size-xl)] data-[size=xl]:text-[length:var(--moduix-text-lg)] data-[size=xl]:leading-[var(--moduix-line-height-text-lg)] data-[size=xs]:size-[var(--moduix-size-xs)] data-[size=xs]:text-[length:var(--moduix-text-xs)] data-[size=xs]:leading-[var(--moduix-line-height-text-xs)]',
        className,
      )}
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