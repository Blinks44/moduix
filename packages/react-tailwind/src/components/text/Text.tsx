import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef, CSSProperties, Ref } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const elements = {
  div: ark.div,
  em: ark.em,
  p: ark.p,
  small: ark.small,
  span: ark.span,
  strong: ark.strong,
} as const;

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';
type TextProps = HTMLArkProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
};

const textVariants = cva('tracking-normal wrap-anywhere', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-secondary-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      left: 'text-left',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
});

const TextRoot = forwardRef<HTMLElement, TextProps>(function TextRoot(
  {
    as,
    asChild,
    size,
    weight,
    tone = 'default',
    align,
    truncate,
    lineClamp,
    className,
    style,
    ...props
  },
  ref,
) {
  const Element = elements[as ?? 'p'] as typeof ark.p;
  const defaultSize = as === 'small' ? 'sm' : 'md';
  const defaultWeight = as === 'strong' ? 'semibold' : 'regular';
  const resolvedLineClamp =
    Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined;

  return (
    <Element
      ref={ref as Ref<ComponentRef<typeof ark.p>>}
      asChild={asChild}
      {...props}
      data-scope="text"
      data-part="root"
      data-slot="text-root"
      data-size={size ?? defaultSize}
      data-weight={weight ?? defaultWeight}
      data-tone={tone}
      data-align={align}
      data-truncate={truncate ? '' : undefined}
      data-line-clamp={resolvedLineClamp === undefined ? undefined : ''}
      className={cn(
        textVariants({
          size: size ?? defaultSize,
          weight: weight ?? defaultWeight,
          tone,
          align: align ?? 'start',
        }),
        truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
        resolvedLineClamp !== undefined &&
          '[display:-webkit-box] overflow-hidden whitespace-normal [-webkit-box-orient:vertical]',
        className,
      )}
      style={
        resolvedLineClamp === undefined
          ? style
          : ({ ...style, WebkitLineClamp: resolvedLineClamp } as CSSProperties)
      }
    />
  );
});

const Text = Object.assign(TextRoot, {
  Root: TextRoot,
});

export { Text };