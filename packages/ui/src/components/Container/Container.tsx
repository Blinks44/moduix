import type { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

function Container({
  as: Root = 'div',
  size = 'lg',
  gutter = 'md',
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  as?: ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  gutter?: 'none' | 'sm' | 'md' | 'lg';
}) {
  return (
    <Root
      {...props}
      data-slot="container-root"
      data-size={size}
      data-gutter={gutter}
      className={clsx(styles.root, className)}
    />
  );
}

export { Container };