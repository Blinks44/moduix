import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';

type SimpleGridRootProps = HTMLArkProps<'div'> & {
  columns?: number;
  minChildWidth?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function toCssLength(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function SimpleGridRoot(props: SimpleGridRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'columns',
    'minChildWidth',
    'gap',
    'rowGap',
    'columnGap',
    'style',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  const gridStyle = (): JSX.CSSProperties | string => {
    if (
      local.columns != null &&
      (!Number.isFinite(local.columns) || !Number.isInteger(local.columns) || local.columns <= 0)
    ) {
      throw new Error('SimpleGrid `columns` must be a finite positive integer.');
    }

    if (
      typeof local.minChildWidth === 'number' &&
      (!Number.isFinite(local.minChildWidth) || local.minChildWidth < 0)
    ) {
      throw new Error('SimpleGrid `minChildWidth` must be a finite non-negative number.');
    }

    let gridTemplateColumns = 'minmax(0, 1fr)';

    if (local.columns != null) {
      gridTemplateColumns = `repeat(${local.columns}, minmax(0, 1fr))`;
    }

    if (local.minChildWidth != null) {
      const width =
        typeof local.minChildWidth === 'number' ? `${local.minChildWidth}px` : local.minChildWidth;
      gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${width}), 1fr))`;
    }

    const generatedStyle: JSX.CSSProperties = {
      display: 'grid',
      'grid-template-columns': gridTemplateColumns,
    };

    if (local.gap != null) {
      generatedStyle.gap = toCssLength(local.gap);
    }

    if (local.rowGap != null) {
      generatedStyle['row-gap'] = toCssLength(local.rowGap);
    }

    if (local.columnGap != null) {
      generatedStyle['column-gap'] = toCssLength(local.columnGap);
    }

    if (typeof local.style === 'string') {
      const generatedStyleText = Object.entries(generatedStyle)
        .map(([property, value]) => `${property}:${value}`)
        .join(';');
      return `${generatedStyleText};${local.style}`;
    }

    return { ...generatedStyle, ...local.style };
  };

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      class={local.class}
      style={gridStyle()}
    />
  );
}

const SimpleGrid = Object.assign(SimpleGridRoot, {
  Root: SimpleGridRoot,
});

export { SimpleGrid };