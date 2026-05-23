import clsx from 'clsx';
import * as React from 'react';
import styles from './Skeleton.module.css';

type SkeletonDimension = number | string;
type SkeletonGrow = number | boolean;
type SkeletonSpacingProps = {
  gap?: SkeletonDimension;
  pt?: SkeletonDimension;
  pb?: SkeletonDimension;
};

type SkeletonProps = React.ComponentProps<'div'> & {
  width?: SkeletonDimension;
  height?: SkeletonDimension;
  radius?: SkeletonDimension;
  grow?: SkeletonGrow;
  animated?: boolean;
};

const toCssValue = (value: SkeletonDimension | undefined) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

const toSpacingStyle = ({ gap, pt, pb }: SkeletonSpacingProps) => {
  return {
    gap: toCssValue(gap),
    paddingTop: toCssValue(pt),
    paddingBottom: toCssValue(pb),
  } satisfies React.CSSProperties;
};

const toFlexValue = (grow: SkeletonGrow | undefined) => {
  if (grow === true) {
    return '1 1 0';
  }

  if (typeof grow === 'number') {
    return `${grow} 1 0`;
  }

  return undefined;
};

function Skeleton({
  className,
  style,
  width,
  height,
  radius,
  grow,
  animated = true,
  ...props
}: SkeletonProps) {
  const skeletonStyle = {
    width: toCssValue(width),
    height: toCssValue(height),
    borderRadius: toCssValue(radius),
    flex: toFlexValue(grow),
    ...style,
  } satisfies React.CSSProperties;

  return (
    <div
      data-slot="skeleton-root"
      data-animated={animated ? '' : undefined}
      aria-hidden="true"
      className={clsx(styles.root, className)}
      style={skeletonStyle}
      {...props}
    />
  );
}

type SkeletonRowProps = React.ComponentProps<'div'> &
  SkeletonSpacingProps & {
    mobileStack?: boolean;
  };

function SkeletonRow({
  className,
  style,
  gap,
  pt,
  pb,
  mobileStack = true,
  ...props
}: SkeletonRowProps) {
  const rowStyle = {
    ...toSpacingStyle({ gap, pt, pb }),
    ...style,
  } satisfies React.CSSProperties;

  return (
    <div
      data-slot="skeleton-row"
      data-mobile-stack={mobileStack ? '' : undefined}
      className={clsx(styles.row, className)}
      style={rowStyle}
      {...props}
    />
  );
}

type SkeletonColumnProps = React.ComponentProps<'div'> &
  SkeletonSpacingProps & {
    grow?: SkeletonGrow;
  };

function SkeletonColumn({ className, style, gap, pt, pb, grow, ...props }: SkeletonColumnProps) {
  const columnStyle = {
    ...toSpacingStyle({ gap, pt, pb }),
    flex: toFlexValue(grow),
    ...style,
  } satisfies React.CSSProperties;

  return (
    <div
      data-slot="skeleton-column"
      className={clsx(styles.column, className)}
      style={columnStyle}
      {...props}
    />
  );
}

type SkeletonCircleProps = Omit<SkeletonProps, 'width' | 'height' | 'radius'> & {
  size?: SkeletonDimension;
};

function SkeletonCircle({ size = 40, ...props }: SkeletonCircleProps) {
  return <Skeleton width={size} height={size} radius="50%" {...props} />;
}

type SkeletonRectProps = SkeletonProps;

function SkeletonRect({ height = 60, ...props }: SkeletonRectProps) {
  return <Skeleton height={height} {...props} />;
}

export { Skeleton, SkeletonRow, SkeletonColumn, SkeletonCircle, SkeletonRect };

export type {
  SkeletonDimension,
  SkeletonProps,
  SkeletonRowProps,
  SkeletonColumnProps,
  SkeletonCircleProps,
  SkeletonRectProps,
};