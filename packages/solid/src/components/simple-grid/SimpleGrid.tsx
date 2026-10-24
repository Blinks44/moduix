import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './SimpleGrid.module.css';

type SimpleGridRootProps = HTMLArkProps<'div'> & {
  columns?: number;
  minChildWidth?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
};

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value;
}

function SimpleGrid(props: SimpleGridRootProps) {
  const [local, others] = splitProps(props, [
    'class',
    'style',
    'columns',
    'minChildWidth',
    'gap',
    'rowGap',
    'columnGap',
  ]);

  const style = (): JSX.CSSProperties | string => {
    // Only set what was passed: removing an unset `row-gap` after `gap` resets part of the shorthand.
    const layoutStyle: JSX.CSSProperties = {};
    if (local.minChildWidth != null) {
      layoutStyle['grid-template-columns'] =
        `repeat(auto-fit, minmax(min(100%, ${toCssLength(local.minChildWidth)}), 1fr))`;
    } else if (local.columns != null) {
      layoutStyle['grid-template-columns'] = `repeat(${local.columns}, minmax(0, 1fr))`;
    }
    if (local.gap != null) layoutStyle.gap = toCssLength(local.gap);
    if (local.rowGap != null) layoutStyle['row-gap'] = toCssLength(local.rowGap);
    if (local.columnGap != null) layoutStyle['column-gap'] = toCssLength(local.columnGap);

    if (typeof local.style !== 'string') {
      return { ...layoutStyle, ...local.style };
    }

    // A string style keeps its native form and stays last, so it overrides the generated layout.
    const layoutStyleText = Object.entries(layoutStyle)
      .map(([property, value]) => `${property}:${value};`)
      .join('');
    return layoutStyleText + local.style;
  };

  return (
    <ark.div
      {...others}
      data-scope="simple-grid"
      data-part="root"
      data-slot="simple-grid-root"
      class={clsx(styles.root, local.class)}
      style={style()}
    />
  );
}

export { SimpleGrid };
export type { SimpleGridRootProps };