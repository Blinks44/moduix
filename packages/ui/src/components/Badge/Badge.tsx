import clsx from 'clsx';
import * as React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeRenderProps = React.ComponentPropsWithoutRef<'span'> &
  React.RefAttributes<React.ComponentRef<'span'>> & {
    'data-size'?: BadgeSize;
    'data-slot'?: string;
    'data-variant'?: BadgeVariant;
  };

type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  render?: React.ReactElement<any>;
};

const Badge = React.forwardRef<React.ComponentRef<'span'>, BadgeProps>(function Badge(
  { className, variant = 'default', size = 'md', children, render, ...props },
  ref,
) {
  const badgeProps: BadgeRenderProps = {
    ref,
    'data-slot': 'badge-root',
    'data-variant': variant,
    'data-size': size,
    className: clsx(styles.root, className),
    ...props,
    children,
  };

  if (render) {
    return React.cloneElement(render, {
      ...badgeProps,
      ...render.props,
      className: clsx(badgeProps.className, render.props?.className),
    });
  }

  return <span {...badgeProps}>{children}</span>;
});

type BadgeDotProps = React.ComponentPropsWithoutRef<'span'>;

const BadgeDot = React.forwardRef<React.ComponentRef<'span'>, BadgeDotProps>(function BadgeDot(
  { className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge-dot"
      aria-hidden="true"
      className={clsx(styles.dot, className)}
      {...props}
    />
  );
});

export { Badge, BadgeDot };
export type { BadgeProps, BadgeDotProps, BadgeVariant, BadgeSize, BadgeRenderProps };