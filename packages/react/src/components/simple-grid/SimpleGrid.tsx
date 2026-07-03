import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './SimpleGrid.module.css';

type SimpleGridRootProps = HTMLArkProps<'div'> &
  (
    | {
        columns?: number;
        minChildWidth?: never;
      }
    | {
        columns?: never;
        minChildWidth: number | string;
      }
  ) & {
    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;
  };

const SimpleGridRoot = forwardRef<HTMLDivElement, SimpleGridRootProps>(function SimpleGridRoot(
  { asChild, className, style, columns, minChildWidth, gap, rowGap, columnGap, ...props },
  ref,
) {
  const templateColumns =
    minChildWidth == null
      ? columns == null
        ? undefined
        : `repeat(${columns}, minmax(0, 1fr))`
      : `repeat(auto-fit, minmax(min(100%, ${
          typeof minChildWidth === 'number' ? `${minChildWidth}px` : minChildWidth
        }), 1fr))`;

  return (
    <ark.div
      {...props}
      ref={ref}
      asChild={asChild}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      className={clsx(styles.root, normalizeClassName(className))}
      style={{
        gridTemplateColumns: templateColumns,
        gap,
        rowGap,
        columnGap,
        ...style,
      }}
    />
  );
});

const SimpleGrid = Object.assign(SimpleGridRoot, {
  Root: SimpleGridRoot,
});

export { SimpleGrid };