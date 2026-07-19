import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';

type SimpleGridRootProps = HTMLArkProps<'div'> & {
  columns?: number;
  minChildWidth?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
};

const SimpleGridRoot = forwardRef<HTMLDivElement, SimpleGridRootProps>(function SimpleGridRoot(
  { asChild, className, style, columns, minChildWidth, gap, rowGap, columnGap, ...props },
  ref,
) {
  let gridTemplateColumns = 'minmax(0, 1fr)';

  if (columns != null) {
    gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }

  if (minChildWidth != null) {
    const width = typeof minChildWidth === 'number' ? `${minChildWidth}px` : minChildWidth;
    gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${width}), 1fr))`;
  }

  const rootStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
  };

  if (gap != null) {
    rootStyle.gap = gap;
  }

  if (rowGap != null) {
    rootStyle.rowGap = rowGap;
  }

  if (columnGap != null) {
    rootStyle.columnGap = columnGap;
  }

  Object.assign(rootStyle, style);

  return (
    <ark.div
      {...props}
      ref={ref}
      asChild={asChild}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      className={clsx(normalizeClassName(className))}
      style={rootStyle}
    />
  );
});

const SimpleGrid = Object.assign(SimpleGridRoot, {
  Root: SimpleGridRoot,
});

export { SimpleGrid };