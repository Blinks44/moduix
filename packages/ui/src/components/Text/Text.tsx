import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import styles from './Text.module.css';

const defaultVariantsByTagName = {
  small: { size: 'sm', weight: 'regular' },
  strong: { size: 'md', weight: 'semibold' },
} as const;

function getDefaultVariants(render: useRender.RenderProp | undefined) {
  if (!render || typeof render === 'function' || typeof render.type !== 'string') {
    return { size: 'md', weight: 'regular' } as const;
  }

  return (
    defaultVariantsByTagName[render.type as keyof typeof defaultVariantsByTagName] ?? {
      size: 'md',
      weight: 'regular',
    }
  );
}

function Text({
  render,
  size,
  weight,
  tone = 'default',
  align,
  className,
  ...props
}: useRender.ComponentProps<'p'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  tone?: 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
  align?: 'left' | 'center' | 'right';
}) {
  const defaults = getDefaultVariants(render);

  return useRender({
    defaultTagName: 'p',
    render,
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