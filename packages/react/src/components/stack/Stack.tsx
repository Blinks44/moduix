import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type StackSpacing =
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5'
  | '5'
  | '6'
  | '7'
  | '8'
  | '10';

type StackRootProps = HTMLArkProps<'div'> & {
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | StackSpacing | (string & {});
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  fill?: boolean;
};

// A spacing step such as `'2'` or `'1.5'` reads `--moduix-spacing-*`, so presets rescale the gap;
// numbers are pixels and other strings are CSS lengths.
function toGap(value: number | string | undefined) {
  if (typeof value === 'number') return `${value}px`;
  return value && /^\d+(\.5)?$/.test(value)
    ? `var(--moduix-spacing-${value.replace('.', '-')})`
    : value;
}

const Stack = forwardRef<HTMLElement, StackRootProps>(function Stack(
  { className, style, direction, gap, align, justify, wrap, fill, ...props },
  ref,
) {
  const responsive = typeof direction === 'string' ? { mobile: direction } : direction;

  return (
    <ark.div
      {...props}
      ref={ref as ForwardedRef<HTMLDivElement>}
      data-scope="stack"
      data-part="root"
      data-slot="stack-root"
      className={clsx(styles.root, fill && styles.fill, className)}
      style={
        {
          '--_stack-direction': responsive?.mobile,
          '--_stack-direction-desktop': responsive?.desktop,
          gap: toGap(gap),
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          ...style,
        } as CSSProperties
      }
    />
  );
});

export { Stack };
export type { StackDirection, StackRootProps, StackSpacing };