import type * as React from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

function toCssValue(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
}

function Skeleton({
  className,
  animated = true,
  style,
  width,
  height,
  radius,
  size,
  shape,
  ...props
}: React.ComponentProps<'div'> & {
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  size?: number | string;
  shape?: 'rect' | 'circle';
}) {
  return (
    <div
      data-slot="skeleton-root"
      data-animated={animated ? '' : undefined}
      aria-hidden="true"
      className={clsx(styles.root, className)}
      style={{
        width: toCssValue(width ?? size),
        height: toCssValue(height ?? size),
        borderRadius: toCssValue(radius ?? (shape === 'circle' ? '50%' : undefined)),
        ...style,
      }}
      {...props}
    />
  );
}

export { Skeleton };