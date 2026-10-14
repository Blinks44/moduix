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
};

function Container(props: ContainerProps) {
  const [local, others] = splitProps(props, ['class', 'gutter', 'size']);

  return (
    <ark.div
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