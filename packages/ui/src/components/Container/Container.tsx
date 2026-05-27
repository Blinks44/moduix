import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

type ContainerElement =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'section';

function Container({
  as: Root = 'div',
  size = 'lg',
  gutter = 'md',
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  as?: ContainerElement;
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