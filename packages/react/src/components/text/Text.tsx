import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentRef, Ref } from 'react';
import { forwardRef } from 'react';
import styles from './Text.module.css';

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'primary' | 'destructive';
type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

type TextRootProps = HTMLArkProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
};

const Text = forwardRef<HTMLElement, TextRootProps>(function Text(
  {
    as = 'p',
    size = as === 'small' ? 'sm' : 'md',
    weight = as === 'strong' ? 'semibold' : 'regular',
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
  const Element = ark[as] as typeof ark.p;
  const clamp = Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined;

  return (
    <Element
      {...props}
      ref={ref as Ref<ComponentRef<typeof ark.p>>}
      data-scope="text"
      data-part="root"
      data-slot="text-root"
      data-size={size}
      data-weight={weight}
      data-tone={tone}
      data-align={align}
      data-truncate={truncate ? '' : undefined}
      data-line-clamp={clamp === undefined ? undefined : ''}
      className={clsx(styles.root, className)}
      style={clamp === undefined ? style : { ...style, WebkitLineClamp: clamp }}
    />
  );
});

export { Text };
export type { TextAlign, TextElement, TextRootProps, TextSize, TextTone, TextWeight };