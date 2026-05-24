import clsx from 'clsx';
import * as React from 'react';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';
type ContainerAlign = 'start' | 'center' | 'end';
type ContainerAs = 'div' | 'main' | 'section' | 'article' | 'header' | 'footer' | 'nav';

type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  as?: ContainerAs;
  size?: ContainerSize;
  gutter?: ContainerGutter;
  align?: ContainerAlign;
};

const Container = React.forwardRef(function Container(
  { as, size = 'lg', gutter = 'md', align = 'center', className, ...props }: ContainerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const Component = as ?? 'div';

  return React.createElement(Component, {
    ...props,
    ref,
    'data-slot': 'container-root',
    'data-size': size,
    'data-gutter': gutter,
    'data-align': align,
    className: clsx(styles.root, className),
  });
});

export { Container };

export type { ContainerProps, ContainerAs, ContainerSize, ContainerGutter, ContainerAlign };