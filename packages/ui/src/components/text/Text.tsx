import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { CSSProperties } from 'react';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Text.module.css';

const defaultVariants = { size: 'md', weight: 'regular' } as const;

const defaultVariantsByElement = {
  small: { size: 'sm', weight: 'regular' },
  strong: { size: 'md', weight: 'semibold' },
} as const;

function getDefaultVariants(element: TextElement | undefined) {
  if (!element) {
    return defaultVariants;
  }

  return (
    defaultVariantsByElement[element as keyof typeof defaultVariantsByElement] ?? defaultVariants
  );
}

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
type TextRootProps = HTMLArkProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
};

const TextRoot = forwardRef<HTMLParagraphElement, TextRootProps>(function TextRoot(
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
  const defaults = getDefaultVariants(as);
  const lineClampStyle =
    lineClamp === undefined
      ? style
      : ({ ...style, '--text-line-clamp': lineClamp } as CSSProperties);

  return (
    <Element
      ref={ref}
      asChild={asChild}
      data-scope="text"
      data-part="root"
      data-slot="text-root"
      data-size={size ?? defaults.size}
      data-weight={weight ?? defaults.weight}
      data-tone={tone}
      data-align={align}
      data-truncate={truncate ? '' : undefined}
      data-line-clamp={lineClamp === undefined ? undefined : ''}
      className={clsx(styles.root, normalizeClassName(className))}
      style={lineClampStyle}
      {...props}
    />
  );
});

const Text = Object.assign(TextRoot, {
  Root: TextRoot,
});

export { Text };
export type { TextAlign, TextElement, TextRootProps, TextSize, TextTone, TextWeight };