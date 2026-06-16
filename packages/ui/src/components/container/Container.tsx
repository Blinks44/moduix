import type { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  as?: ElementType;
  size?: ContainerSize;
  gutter?: ContainerGutter;
};

function Container({
  as: Root = 'div',
  size = 'lg',
  gutter = 'md',
  className,
  ...props
}: ContainerProps) {
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