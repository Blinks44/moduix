import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Container.module.css';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

export type ContainerRootProps = HTMLArkProps<'div'> & {
  size?: ContainerSize;
  gutter?: ContainerGutter;
};

const ContainerRoot = forwardRef<HTMLDivElement, ContainerRootProps>(function ContainerRoot(
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
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const Container = Object.assign(ContainerRoot, {
  Root: ContainerRoot,
});

export { Container };