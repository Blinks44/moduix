import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { Children, Fragment, forwardRef, type CSSProperties, type ReactNode } from 'react';
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
  separator?: ReactNode;
};

const StackRoot = forwardRef<HTMLDivElement, StackRootProps>(function StackRoot(
  {
    asChild,
    children,
    className,
    style,
    direction,
    gap,
    align,
    justify,
    wrap,
    fill,
    separator,
    ...props
  },
  ref,
) {
  const mobileDirection =
    typeof direction === 'string' ? direction : (direction?.mobile ?? direction?.desktop);
  const desktopDirection =
    typeof direction === 'string' ? direction : (direction?.desktop ?? direction?.mobile);
  const childArray = separator == null ? undefined : Children.toArray(children);
  const content =
    childArray == null
      ? children
      : childArray.map((child, index) => (
          <Fragment key={index}>
            {index > 0 ? separator : null}
            {child}
          </Fragment>
        ));

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
      {content}
    </ark.div>
  );
});

const Stack = Object.assign(StackRoot, {
  Root: StackRoot,
});

export { Stack };