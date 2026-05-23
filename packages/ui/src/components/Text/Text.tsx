import clsx from 'clsx';
import * as React from 'react';
import styles from './Text.module.css';

type TextDefaultElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextAs = React.ElementType;
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'left' | 'center' | 'right';

type TextOwnProps<TElement extends TextAs = 'p'> = {
  as?: TElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
};

type TextProps<TElement extends TextAs = 'p'> = TextOwnProps<TElement> &
  Omit<React.ComponentPropsWithoutRef<TElement>, keyof TextOwnProps<TElement>>;

const TEXT_FALLBACK_DEFAULTS = { size: 'md', weight: 'regular' } as const;
const TEXT_DEFAULTS_BY_ELEMENT = {
  p: TEXT_FALLBACK_DEFAULTS,
  span: TEXT_FALLBACK_DEFAULTS,
  small: { size: 'sm', weight: 'regular' },
  strong: { size: 'md', weight: 'semibold' },
  em: TEXT_FALLBACK_DEFAULTS,
  div: TEXT_FALLBACK_DEFAULTS,
} satisfies Record<TextDefaultElement, { size: TextSize; weight: TextWeight }>;

function resolveTextDefaults(as: TextAs): { size: TextSize; weight: TextWeight } {
  if (typeof as !== 'string') return TEXT_FALLBACK_DEFAULTS;

  return Object.hasOwn(TEXT_DEFAULTS_BY_ELEMENT, as)
    ? TEXT_DEFAULTS_BY_ELEMENT[as as TextDefaultElement]
    : TEXT_FALLBACK_DEFAULTS;
}

function Text<TElement extends TextAs = 'p'>({
  as,
  size,
  weight,
  tone = 'default',
  align,
  className,
  children,
  ...props
}: TextProps<TElement>) {
  const Component = as ?? 'p';
  const defaults = resolveTextDefaults(Component);

  return React.createElement(
    Component,
    {
      ...props,
      'data-slot': 'text-root',
      'data-size': size ?? defaults.size,
      'data-weight': weight ?? defaults.weight,
      'data-tone': tone,
      'data-align': align,
      className: clsx(styles.root, className),
    },
    children,
  );
}

export {
  Text,
  type TextProps,
  type TextAs,
  type TextDefaultElement,
  type TextSize,
  type TextWeight,
  type TextTone,
  type TextAlign,
};