import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/solid/avatar';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarRootProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
};
type AvatarRootProviderProps = ComponentProps<typeof AvatarPrimitive.RootProvider> & {
  size?: AvatarSize;
};
type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback> & {
  name?: string;
};

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

const getFirstGrapheme = (value: string) => {
  const [firstGrapheme] = graphemeSegmenter.segment(value);

  return firstGrapheme?.segment ?? '';
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? '';
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';

  return firstName && lastName
    ? `${getFirstGrapheme(firstName)}${getFirstGrapheme(lastName)}`
    : getFirstGrapheme(firstName);
};

function AvatarFallbackIcon() {
  return (
    <svg
      {...decorativeSvgProps}
      data-slot="avatar-fallback-icon"
      class={styles.fallbackIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

const getFallbackContent = (content: JSX.Element, name?: string) => {
  if (content !== undefined && content !== null) return content;

  const initials = name ? getInitials(name) : '';

  return initials || <AvatarFallbackIcon />;
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

function AvatarFallback(props: AvatarFallbackProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'name']);
  const resolvedChildren = children(() => local.children);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      class={clsx(styles.fallback, local.class)}
      {...others}
    >
      {getFallbackContent(resolvedChildren(), local.name)}
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