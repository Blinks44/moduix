import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentRef, CSSProperties, Ref } from 'react';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Text.module.css';

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
type TextAlign = 'left' | 'center' | 'right';
type TextProps = HTMLArkProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
};

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
  const lineClampStyle =
    lineClamp === undefined
      ? style
      : ({ ...style, '--text-line-clamp': lineClamp } as CSSProperties);

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
      data-line-clamp={lineClamp === undefined ? undefined : ''}
      className={clsx(styles.root, normalizeClassName(className))}
      style={lineClampStyle}
    />
  );
});

const Text = Object.assign(TextRoot, {
  Root: TextRoot,
});

export { Text };