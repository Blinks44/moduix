import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/solid/avatar';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Avatar.module.css';

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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function AvatarImage(props: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      class={clsx(styles.image, local.class)}
      {...others}
    />
  );
}

function AvatarFallback(props: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      class={clsx(styles.fallback, local.class)}
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