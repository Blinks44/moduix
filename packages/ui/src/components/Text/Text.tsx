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

function Text({
  as,
  render,
  size,
  weight,
  tone = 'default',
  align,
  className,
  ...props
}: useRender.ComponentProps<'p'> & {
  as?: 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  tone?: 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
  align?: 'left' | 'center' | 'right';
}) {
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