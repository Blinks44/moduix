import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/solid/avatar';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
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

function Avatar(props: AvatarRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.Root
      class={cn(avatarVariants({ size: local.size }), local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="avatar-root"
    />
  );
}

function AvatarRootProvider(props: AvatarRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.RootProvider
      class={cn(avatarVariants({ size: local.size }), local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="avatar-root-provider"
    />
  );
}

function AvatarImage(props: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AvatarPrimitive.Image
      class={cn(
        'block size-full rounded-[inherit] object-cover data-[state=hidden]:hidden',
        local.class,
      )}
      {...others}
      data-slot="avatar-image"
    />
  );
}

function AvatarFallback(props: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AvatarPrimitive.Fallback
      class={cn(
        'inline-flex size-full items-center justify-center overflow-hidden rounded-[inherit] data-[state=hidden]:hidden',
        local.class,
      )}
      {...others}
      data-slot="avatar-fallback"
    />
  );
}

function AvatarGroup(props: AvatarGroupProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        'flex items-center *:not-first:-ms-2 *:data-[scope=avatar]:ring-2 *:data-[scope=avatar]:ring-background',
        local.class,
      )}
      {...others}
      data-slot="avatar-group"
    />
  );
}

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