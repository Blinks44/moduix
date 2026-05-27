import type * as React from 'react';
import clsx from 'clsx';
import styles from './Stack.module.css';

function Stack({
  as: Root = 'div',
  className,
  style,
  direction,
  gap,
  align,
  justify,
  wrap,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType;
  direction?: 'row' | 'column';
  gap?: number | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
}) {
  return (
    <Root
      data-slot="stack-root"
      className={clsx(styles.root, className)}
      style={{
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...style,
      }}
      {...props}
    />
  );
}

export { Stack };