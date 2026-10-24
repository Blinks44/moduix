import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Separator.module.css';

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

type SeparatorRootProps = HTMLArkProps<'span'> & {
  orientation?: SeparatorOrientation;
  size?: SeparatorSize;
  variant?: SeparatorVariant;
};

function Separator(props: SeparatorRootProps) {
  const [local, others] = splitProps(props, [
    'aria-orientation',
    'class',
    'orientation',
    'role',
    'size',
    'variant',
  ]);
  const orientation = () => local.orientation ?? 'horizontal';
  const role = () => local.role ?? 'separator';

  return (
    <ark.span
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
export type { SeparatorOrientation, SeparatorRootProps, SeparatorSize, SeparatorVariant };