import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

type ContainerProps = HTMLArkProps<'div'> & {
  size?: ContainerSize;
  gutter?: ContainerGutter;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-size'?: string;
  'data-gutter'?: string;
};

function Container(props: ContainerProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'gutter',
    'size',
    'data-scope',
    'data-part',
    'data-slot',
    'data-size',
    'data-gutter',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="container"
      data-part="root"
      data-slot="container-root"
      data-size={local.size ?? 'lg'}
      data-gutter={local.gutter ?? 'md'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Container };