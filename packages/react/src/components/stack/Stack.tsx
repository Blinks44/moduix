import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackProps = HTMLArkProps<'div'> & {
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
};

const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { asChild, children, className, style, direction, gap, align, justify, wrap, fill, ...props },
  ref,
) {
  const mobileDirection =
    typeof direction === 'string' ? direction : (direction?.mobile ?? direction?.desktop);
  const desktopDirection =
    typeof direction === 'string' ? direction : (direction?.desktop ?? direction?.mobile);
  return (
    <ark.div
      {...props}
      ref={ref as ForwardedRef<HTMLDivElement>}
      asChild={asChild}
      data-scope="stack"
      data-part="root"
      data-slot="stack-root"
      className={clsx(styles.root, className)}
      style={
        {
          '--moduix-stack-direction-desktop': desktopDirection ?? 'column',
          '--moduix-stack-direction-mobile': mobileDirection ?? 'column',
          '--moduix-stack-flex': fill == null ? undefined : fill ? '1 1 0%' : 'initial',
          gap,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </ark.div>
  );
});

export { Stack };
