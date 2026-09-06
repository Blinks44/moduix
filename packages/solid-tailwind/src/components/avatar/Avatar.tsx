import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/solid/avatar';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      class={cn(
        'relative box-border inline-flex size-[var(--moduix-size-md)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle text-[length:var(--moduix-text-md)] leading-[var(--moduix-line-height-text-md)] font-medium text-foreground select-none data-[size=lg]:size-[var(--moduix-size-lg)] data-[size=lg]:text-[length:var(--moduix-text-lg)] data-[size=lg]:leading-[var(--moduix-line-height-text-lg)] data-[size=sm]:size-[var(--moduix-size-sm)] data-[size=sm]:text-[length:var(--moduix-text-sm)] data-[size=sm]:leading-[var(--moduix-line-height-text-sm)] data-[size=xl]:size-[var(--moduix-size-xl)] data-[size=xl]:text-[length:var(--moduix-text-lg)] data-[size=xl]:leading-[var(--moduix-line-height-text-lg)] data-[size=xs]:size-[var(--moduix-size-xs)] data-[size=xs]:text-[length:var(--moduix-text-xs)] data-[size=xs]:leading-[var(--moduix-line-height-text-xs)]',
        local.class,
      )}
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
      class={cn(
        'relative box-border inline-flex size-[var(--moduix-size-md)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle text-[length:var(--moduix-text-md)] leading-[var(--moduix-line-height-text-md)] font-medium text-foreground select-none data-[size=lg]:size-[var(--moduix-size-lg)] data-[size=lg]:text-[length:var(--moduix-text-lg)] data-[size=lg]:leading-[var(--moduix-line-height-text-lg)] data-[size=sm]:size-[var(--moduix-size-sm)] data-[size=sm]:text-[length:var(--moduix-text-sm)] data-[size=sm]:leading-[var(--moduix-line-height-text-sm)] data-[size=xl]:size-[var(--moduix-size-xl)] data-[size=xl]:text-[length:var(--moduix-text-lg)] data-[size=xl]:leading-[var(--moduix-line-height-text-lg)] data-[size=xs]:size-[var(--moduix-size-xs)] data-[size=xs]:text-[length:var(--moduix-text-xs)] data-[size=xs]:leading-[var(--moduix-line-height-text-xs)]',
        local.class,
      )}
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
        'box-border inline-flex size-full items-center justify-center rounded-[inherit] bg-[inherit] p-0 leading-[inherit] text-inherit data-[state=hidden]:hidden',
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