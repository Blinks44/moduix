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

const defaultSizeByElement: Record<TextDefaultElement, TextSize> = {
  p: 'md',
  span: 'md',
  small: 'sm',
  strong: 'md',
  em: 'md',
  div: 'md',
};

const defaultWeightByElement: Record<TextDefaultElement, TextWeight> = {
  p: 'regular',
  span: 'regular',
  small: 'regular',
  strong: 'semibold',
  em: 'regular',
  div: 'regular',
};

function getDefaultSize(element: TextAs): TextSize {
  return typeof element === 'string' && element in defaultSizeByElement
    ? defaultSizeByElement[element as TextDefaultElement]
    : 'md';
}

function getDefaultWeight(element: TextAs): TextWeight {
  return typeof element === 'string' && element in defaultWeightByElement
    ? defaultWeightByElement[element as TextDefaultElement]
    : 'regular';
}

export function Text<TElement extends TextAs = 'p'>({
  as,
  size,
  weight,
  tone = 'default',
  align,
  className,
  children,
  ...props
}: TextProps<TElement>) {
  const Component = (as ?? 'p') as React.ElementType;
  const resolvedSize = size ?? getDefaultSize(Component);
  const resolvedWeight = weight ?? getDefaultWeight(Component);

  return React.createElement(
    Component,
    {
      ...props,
      'data-slot': 'text-root',
      'data-size': resolvedSize,
      'data-weight': resolvedWeight,
      'data-tone': tone,
      'data-align': align,
      className: clsx(styles.root, className),
    },
    children,
  );
}

export {
  type TextProps,
  type TextAs,
  type TextDefaultElement,
  type TextSize,
  type TextWeight,
  type TextTone,
  type TextAlign,
};