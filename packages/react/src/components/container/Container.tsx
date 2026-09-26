import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

type ContainerProps = HTMLArkProps<'div'> & {
  size?: ContainerSize;
  gutter?: ContainerGutter;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'lg', gutter = 'md', className, ...props },
  ref,
) {
  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="container"
      data-part="root"
      data-slot="container-root"
      data-size={size}
      data-gutter={gutter}
      className={clsx(styles.root, className)}
    />
  );
});

export { Container };