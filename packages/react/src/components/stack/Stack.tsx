import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackRootProps = HTMLArkProps<'div'> & {
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  fill?: boolean;
};

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
          gap,
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
export type { StackDirection, StackRootProps };