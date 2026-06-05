import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import { createElement } from 'react';
import styles from './Text.module.css';

const defaultVariants = { size: 'md', weight: 'regular' } as const;

const defaultVariantsByTagName = {
  small: { size: 'sm', weight: 'regular' },
  strong: { size: 'md', weight: 'semibold' },
} as const;

function getDefaultVariants(tagName: string | undefined) {
  if (!tagName) {
    return defaultVariants;
  }

  return (
    defaultVariantsByTagName[tagName as keyof typeof defaultVariantsByTagName] ?? defaultVariants
  );
}

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'left' | 'center' | 'right';
type TextProps = useRender.ComponentProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
};

function Text({
  as,
  render,
  size,
  weight,
  tone = 'default',
  align,
  className,
  ...props
}: TextProps) {
  const resolvedRender = render ?? (as ? createElement(as) : undefined);
  const tagName =
    typeof resolvedRender === 'function'
      ? undefined
      : typeof resolvedRender?.type === 'string'
        ? resolvedRender.type
        : undefined;
  const defaults = getDefaultVariants(tagName);

  return useRender({
    defaultTagName: 'p',
    render: resolvedRender,
    props: {
      ...props,
      'data-slot': 'text-root',
      'data-size': size ?? defaults.size,
      'data-weight': weight ?? defaults.weight,
      'data-tone': tone,
      'data-align': align,
      className: clsx(styles.root, className),
    },
  });
}

export { Text };
export type { TextAlign, TextElement, TextProps, TextSize, TextTone, TextWeight };