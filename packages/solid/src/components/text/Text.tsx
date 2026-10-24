import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
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

function Text(props: TextRootProps) {
  const [local, others] = splitProps(props, [
    'as',
    'size',
    'weight',
    'tone',
    'align',
    'truncate',
    'lineClamp',
    'class',
    'style',
  ]);
  const as = () => local.as ?? 'p';
  const clamp = () =>
    Number.isInteger(local.lineClamp) && (local.lineClamp ?? 0) > 0 ? local.lineClamp : undefined;
  const style = (): JSX.CSSProperties | string | undefined => {
    const value = clamp();

    if (value === undefined) return local.style;
    if (typeof local.style === 'string') return `${local.style};-webkit-line-clamp:${value}`;
    return { ...local.style, '-webkit-line-clamp': value };
  };

  return (
    <Dynamic
      component={ark[as()] as typeof ark.p}
      {...others}
      data-scope="text"
      data-part="root"
      data-slot="text-root"
      data-size={local.size ?? (as() === 'small' ? 'sm' : 'md')}
      data-weight={local.weight ?? (as() === 'strong' ? 'semibold' : 'regular')}
      data-tone={local.tone ?? 'default'}
      data-align={local.align}
      data-truncate={local.truncate ? '' : undefined}
      data-line-clamp={clamp() === undefined ? undefined : ''}
      class={clsx(styles.root, local.class)}
      style={style()}
    />
  );
}

export { Text };
export type { TextAlign, TextElement, TextRootProps, TextSize, TextTone, TextWeight };