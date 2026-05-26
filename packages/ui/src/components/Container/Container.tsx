import clsx from 'clsx';
import * as React from 'react';
import styles from './Container.module.css';

function Container({
  as: Root = 'div',
  size = 'lg',
  gutter = 'md',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  gutter?: 'none' | 'sm' | 'md' | 'lg';
}) {
  return (
    <Root
      data-slot="container-root"
      data-size={size}
      data-gutter={gutter}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

export { Container };