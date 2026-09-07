import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/solid/avatar';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle font-medium text-foreground select-none',
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

function AvatarRoot(props: AvatarRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar-root"
      data-size={local.size}
      class={cn(avatarVariants({ size: local.size }), local.class)}
      {...others}
    />
  );
}

function AvatarRootProvider(props: AvatarRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.RootProvider
      data-slot="avatar-root-provider"
      data-size={local.size}
      class={cn(avatarVariants({ size: local.size }), local.class)}
      {...others}
    />
  );
}

function AvatarImage(props: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      class={cn(
        'block size-full rounded-[inherit] object-cover object-center data-[state=hidden]:hidden',
        local.class,
      )}
      {...others}
    />
  );
}

function AvatarFallback(props: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      class={cn(
        'inline-flex size-full items-center justify-center rounded-[inherit] bg-[inherit] data-[state=hidden]:hidden',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </AvatarPrimitive.Fallback>
  );
}

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Context: AvatarPrimitive.Context,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { Avatar, useAvatar, useAvatarContext };