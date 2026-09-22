import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Separator.module.css';

type SeparatorProps = HTMLArkProps<'span'> & {
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'dashed' | 'dotted';
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-orientation'?: string;
  'data-size'?: string;
  'data-variant'?: string;
};

function Separator(props: SeparatorProps) {
  const [local, others] = splitProps(props, [
    'aria-orientation',
    'asChild',
    'class',
    'data-orientation',
    'data-part',
    'data-scope',
    'data-size',
    'data-slot',
    'data-variant',
    'orientation',
    'role',
    'size',
    'variant',
  ]);
  const orientation = () => local.orientation ?? 'horizontal';
  const role = () => local.role ?? 'separator';

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      role={role()}
      aria-orientation={role() === 'separator' ? orientation() : undefined}
      data-scope="separator"
      data-part="root"
      data-slot="separator-root"
      data-orientation={orientation()}
      data-size={local.size ?? 'sm'}
      data-variant={local.variant ?? 'solid'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Separator };
