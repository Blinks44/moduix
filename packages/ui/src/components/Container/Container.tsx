import clsx from 'clsx';
import * as React from 'react';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';
type ContainerAlign = 'start' | 'center' | 'end';
type ContainerAs = React.ElementType;

type ContainerOwnProps<As extends ContainerAs = 'div'> = {
  as?: As;
  size?: ContainerSize;
  gutter?: ContainerGutter;
  align?: ContainerAlign;
};

type ContainerProps<As extends ContainerAs = 'div'> = ContainerOwnProps<As> &
  Omit<React.ComponentPropsWithRef<As>, keyof ContainerOwnProps<As>>;

type ContainerComponent = <As extends ContainerAs = 'div'>(
  props: ContainerProps<As>,
) => React.ReactElement | null;

const Container = React.forwardRef(function Container(
  {
    as,
    size = 'lg',
    gutter = 'md',
    align = 'center',
    className,
    ...props
  }: ContainerProps<ContainerAs>,
  ref: React.ForwardedRef<Element>,
) {
  const Component = as ?? 'div';

  return (
    <Component
      ref={ref}
      data-slot="container-root"
      data-size={size}
      data-gutter={gutter}
      data-align={align}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}) as ContainerComponent;

export { Container };

export type { ContainerProps, ContainerAs, ContainerSize, ContainerGutter, ContainerAlign };