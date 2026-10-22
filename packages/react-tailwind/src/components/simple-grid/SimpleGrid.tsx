import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SimpleGridRootProps = HTMLArkProps<'div'> & {
  columns?: number;
  minChildWidth?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
};

const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridRootProps>(function SimpleGrid(
  { className, style, columns, minChildWidth, gap, rowGap, columnGap, ...props },
  ref,
) {
  // Only set what was passed: React writes an empty `rowGap` after `gap` and resets part of the shorthand.
  const layoutStyle: CSSProperties = {};
  if (minChildWidth != null) {
    const width = typeof minChildWidth === 'number' ? `${minChildWidth}px` : minChildWidth;
    layoutStyle.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${width}), 1fr))`;
  } else if (columns != null) {
    layoutStyle.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }
  if (gap != null) layoutStyle.gap = gap;
  if (rowGap != null) layoutStyle.rowGap = rowGap;
  if (columnGap != null) layoutStyle.columnGap = columnGap;

  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      className={cn('grid grid-cols-1', className)}
      style={{ ...layoutStyle, ...style }}
    />
  );
});

export { SimpleGrid };
export type { SimpleGridRootProps };