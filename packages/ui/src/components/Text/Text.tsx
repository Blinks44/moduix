import clsx from 'clsx';
import * as React from 'react';
import styles from './Text.module.css';

type TextAs = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'left' | 'center' | 'right';

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: TextAs;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
};

const defaultSizeByElement: Record<TextAs, TextSize> = {
  p: 'md',
  span: 'md',
  small: 'sm',
  strong: 'md',
  em: 'md',
  div: 'md',
};

const defaultWeightByElement: Record<TextAs, TextWeight> = {
  p: 'regular',
  span: 'regular',
  small: 'regular',
  strong: 'semibold',
  em: 'regular',
  div: 'regular',
};

export function Text({
  as = 'p',
  size,
  weight,
  tone = 'default',
  align,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as;
  const resolvedSize = size ?? defaultSizeByElement[as];
  const resolvedWeight = weight ?? defaultWeightByElement[as];

  return (
    <Component
      data-slot="text-root"
      data-size={resolvedSize}
      data-weight={resolvedWeight}
      data-tone={tone}
      data-align={align}
      className={clsx(styles.root, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export {
  type TextProps,
  type TextAs,
  type TextSize,
  type TextWeight,
  type TextTone,
  type TextAlign,
};