import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn } from '@/lib/moduix/cn';

const elements = {
  div: ark.div,
  em: ark.em,
  p: ark.p,
  small: ark.small,
  span: ark.span,
  strong: ark.strong,
} as const;

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';
type TextProps = HTMLArkProps<'p'> & {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-size'?: string;
  'data-weight'?: string;
  'data-tone'?: string;
  'data-align'?: string;
  'data-truncate'?: string;
  'data-line-clamp'?: string;
};

const textVariants = cva('tracking-normal wrap-anywhere', {
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
      subtle: 'text-secondary-foreground',
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
  },
});

function Text(props: TextProps) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'size',
    'weight',
    'tone',
    'align',
    'truncate',
    'lineClamp',
    'class',
    'style',
    'data-scope',
    'data-part',
    'data-slot',
    'data-size',
    'data-weight',
    'data-tone',
    'data-align',
    'data-truncate',
    'data-line-clamp',
  ]);
  const Element = () => elements[local.as ?? 'p'] as typeof ark.p;
  const defaultSize = () => (local.as === 'small' ? 'sm' : 'md');
  const defaultWeight = () => (local.as === 'strong' ? 'semibold' : 'regular');
  const resolvedLineClamp = () =>
    Number.isInteger(local.lineClamp) && (local.lineClamp ?? 0) > 0 ? local.lineClamp : undefined;
  const lineClampStyle = (): JSX.CSSProperties | string | undefined => {
    const value = resolvedLineClamp();

    if (value === undefined) return local.style;
    if (typeof local.style === 'string') {
      return `${local.style};-webkit-line-clamp:${value}`;
    }

    return { ...local.style, '-webkit-line-clamp': value };
  };

  return (
    <Dynamic
      component={Element()}
      asChild={local.asChild}
      {...others}
      data-scope="text"
      data-part="root"
      data-slot="text-root"
      data-size={local.size ?? defaultSize()}
      data-weight={local.weight ?? defaultWeight()}
      data-tone={local.tone ?? 'default'}
      data-align={local.align}
      data-truncate={local.truncate ? '' : undefined}
      data-line-clamp={resolvedLineClamp() === undefined ? undefined : ''}
      class={cn(
        textVariants({
          size: local.size ?? defaultSize(),
          weight: local.weight ?? defaultWeight(),
          tone: local.tone ?? 'default',
          align: local.align ?? 'start',
        }),
        local.truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
        resolvedLineClamp() !== undefined &&
          '[display:-webkit-box] overflow-hidden whitespace-normal [-webkit-box-orient:vertical]',
        local.class,
      )}
      style={lineClampStyle()}
    />
  );
}

export { Text };