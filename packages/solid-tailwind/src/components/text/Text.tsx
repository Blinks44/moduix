import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn } from '@/lib/moduix/cn';

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

const textVariants = cva('m-0 tracking-normal wrap-anywhere', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      left: 'text-left',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
    lineClamp: {
      true: '[display:-webkit-box] overflow-hidden whitespace-normal [-webkit-box-orient:vertical]',
    },
  },
});

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
  const size = () => local.size ?? (as() === 'small' ? 'sm' : 'md');
  const weight = () => local.weight ?? (as() === 'strong' ? 'semibold' : 'regular');
  const tone = () => local.tone ?? 'default';
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
      data-size={size()}
      data-weight={weight()}
      data-tone={tone()}
      data-align={local.align}
      data-truncate={local.truncate ? '' : undefined}
      data-line-clamp={clamp() === undefined ? undefined : ''}
      class={cn(
        textVariants({
          size: size(),
          weight: weight(),
          tone: tone(),
          align: local.align,
          truncate: local.truncate,
          lineClamp: clamp() !== undefined,
        }),
        local.class,
      )}
      style={style()}
    />
  );
}

export { Text };
export type { TextAlign, TextElement, TextRootProps, TextSize, TextTone, TextWeight };