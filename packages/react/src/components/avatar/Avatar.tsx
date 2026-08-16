import { Avatar as AvatarPrimitive, useAvatar, useAvatarContext } from '@ark-ui/react/avatar';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef, type ReactNode } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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
      aria-hidden="true"
      focusable="false"
      data-slot="avatar-fallback-icon"
      className={styles.fallbackIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

const getFallbackContent = (children: ReactNode, name?: string) => {
  if (children !== undefined && children !== null) return children;

  const initials = name ? getInitials(name) : '';

  return initials || <AvatarFallbackIcon />;
};

const AvatarRoot = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  function AvatarRoot({ className, size, ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.image, normalizeClassName(className))}
      {...props}
    />
  );
});

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback({ children, className, name, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={clsx(styles.fallback, normalizeClassName(className))}
      {...props}
    >
      {getFallbackContent(children, name)}
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