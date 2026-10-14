import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeRootProps = HTMLArkProps<'span'> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

function BadgeLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="label"
      data-slot="badge-label"
      class={clsx(styles.label, local.class)}
    />
  );
}

function Badge(props: BadgeRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'default'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function BadgeDot(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="dot"
      data-slot="badge-dot"
      aria-hidden="true"
      class={clsx(styles.dot, local.class)}
    />
  );
}

export { Badge, BadgeDot, BadgeLabel };
export type { BadgeRootProps, BadgeSize, BadgeVariant };