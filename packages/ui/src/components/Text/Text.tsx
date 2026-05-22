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

const TEXT_DEFAULTS_BY_ELEMENT: Record<TextDefaultElement, { size: TextSize; weight: TextWeight }> =
  {
    p: { size: 'md', weight: 'regular' },
    span: { size: 'md', weight: 'regular' },
    small: { size: 'sm', weight: 'regular' },
    strong: { size: 'md', weight: 'semibold' },
    em: { size: 'md', weight: 'regular' },
    div: { size: 'md', weight: 'regular' },
  };

const TEXT_FALLBACK_DEFAULTS = { size: 'md', weight: 'regular' } as const;

function resolveTextDefaults(as: TextAs): { size: TextSize; weight: TextWeight } {
  if (typeof as !== 'string') return TEXT_FALLBACK_DEFAULTS;
  if (!(as in TEXT_DEFAULTS_BY_ELEMENT)) return TEXT_FALLBACK_DEFAULTS;
  return TEXT_DEFAULTS_BY_ELEMENT[as as TextDefaultElement];
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