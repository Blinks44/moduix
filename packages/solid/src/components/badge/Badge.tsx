import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Badge.module.css';

type BadgeDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

type BadgeRootProps = HTMLArkProps<'span'> &
  BadgeDataProps & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
    'data-variant'?: string;
  };

type BadgeLabelProps = HTMLArkProps<'span'> & BadgeDataProps;

type BadgeDotProps = HTMLArkProps<'span'> &
  BadgeDataProps & {
    'aria-hidden'?: boolean | 'true' | 'false';
  };

function BadgeLabel(props: BadgeLabelProps) {
  const [local, others] = splitProps(props, ['class', 'data-scope', 'data-part', 'data-slot']);

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

function BadgeRoot(props: BadgeRootProps) {
  const [local, others] = splitProps(props, [
    'class',
    'data-scope',
    'data-part',
    'data-slot',
    'data-variant',
    'variant',
  ]);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-variant={local.variant ?? 'default'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function BadgeDot(props: BadgeDotProps) {
  const [local, others] = splitProps(props, [
    'aria-hidden',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

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

const Badge = Object.assign(BadgeRoot, {
  Root: BadgeRoot,
  Label: BadgeLabel,
  Dot: BadgeDot,
});

export { Badge };