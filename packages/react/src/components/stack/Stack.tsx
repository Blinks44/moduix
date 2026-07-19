import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'column';

type StackRootProps = HTMLArkProps<'div'> & {
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

const StackRoot = forwardRef<HTMLDivElement, StackRootProps>(function StackRoot(
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
      ref={ref}
      asChild={asChild}
      data-scope="stack"
      data-part="root"
      data-slot="stack-root"
      className={clsx(styles.root, normalizeClassName(className))}
      style={
        {
          '--stack-direction-desktop': desktopDirection,
          '--stack-direction-mobile': mobileDirection,
          '--stack-flex': fill == null ? undefined : fill ? '1 1 0' : 'initial',
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

const Stack = Object.assign(StackRoot, {
  Root: StackRoot,
});

export { Stack };