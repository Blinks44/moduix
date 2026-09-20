import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';

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
  if (columns != null && (!Number.isInteger(columns) || columns <= 0)) {
    throw new Error('SimpleGrid `columns` must be a finite positive integer.');
  }

  if (typeof minChildWidth === 'number' && (!Number.isFinite(minChildWidth) || minChildWidth < 0)) {
    throw new Error('SimpleGrid `minChildWidth` must be a finite non-negative number.');
  }

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
    ...(gap == null ? {} : { gap }),
    ...(rowGap == null ? {} : { rowGap }),
    ...(columnGap == null ? {} : { columnGap }),
    ...style,
  };

  return (
    <ark.div
      {...props}
      ref={ref}
      asChild={asChild}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      className={className}
      style={rootStyle}
    />
  );
});

const SimpleGrid = Object.assign(SimpleGridRoot, {
  Root: SimpleGridRoot,
});

export { SimpleGrid };