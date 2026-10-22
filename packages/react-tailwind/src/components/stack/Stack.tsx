import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { CSSProperties, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackRootProps = HTMLArkProps<'div'> & {
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  fill?: boolean;
};

const stackVariants = cva('flex', {
  variants: {
    mobileDirection: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    desktopDirection: {
      row: 'sm:flex-row',
      'row-reverse': 'sm:flex-row-reverse',
      column: 'sm:flex-col',
      'column-reverse': 'sm:flex-col-reverse',
    },
    fill: {
      true: 'flex-1',
    },
  },
  defaultVariants: {
    mobileDirection: 'column',
  },
});

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
      className={cn(
        stackVariants({
          mobileDirection: responsive?.mobile,
          desktopDirection: responsive?.desktop,
          fill,
        }),
        className,
      )}
      style={{
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...style,
      }}
    />
  );
});

export { Stack };
export type { StackDirection, StackRootProps };