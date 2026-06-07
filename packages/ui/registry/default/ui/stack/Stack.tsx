import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import { clsx } from 'clsx';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'column';

function Stack({
  as: Root = 'div',
  className,
  style,
  direction,
  gap,
  align,
  justify,
  wrap,
  fill,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  as?: ElementType;
  direction?:
    | StackDirection
    | {
        mobile?: StackDirection;
        desktop?: StackDirection;
      };
  gap?: number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  fill?: boolean;
}) {
  const responsiveDirection =
    typeof direction === 'string' ? { mobile: direction, desktop: direction } : direction;

  return (
    <Root
      {...props}
      data-slot="stack-root"
      className={clsx(styles.root, className)}
      style={
        {
          '--stack-direction-desktop':
            responsiveDirection?.desktop ?? responsiveDirection?.mobile ?? 'column',
          '--stack-direction-mobile':
            responsiveDirection?.mobile ?? responsiveDirection?.desktop ?? 'column',
          '--stack-flex': fill ? '1 1 0' : 'initial',
          gap,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          ...style,
        } as CSSProperties
      }
    />
  );
}

export { Stack };