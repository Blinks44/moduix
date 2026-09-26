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

function Avatar(props: AvatarRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.Root
      data-size={local.size}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="avatar-root"
    />
  );
}

function AvatarRootProvider(props: AvatarRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <AvatarPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size}
      data-slot="avatar-root-provider"
    />
  );
}

function AvatarImage(props: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AvatarPrimitive.Image
      class={clsx(styles.image, local.class)}
      {...others}
      data-slot="avatar-image"
    />
  );
}

function AvatarFallback(props: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <AvatarPrimitive.Fallback
      class={clsx(styles.fallback, local.class)}
      {...others}
      data-slot="avatar-fallback"
    >
      {local.children}
    </AvatarPrimitive.Fallback>
  );
}

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