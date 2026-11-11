<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
  export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
  export type TextTone = 'default' | 'muted' | 'primary' | 'destructive';
  export type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

  export interface TextRootProps extends HTMLProps<'p'>, PolymorphicProps<'p'>, RefAttribute {
    as?: TextElement;
    size?: TextSize;
    weight?: TextWeight;
    tone?: TextTone;
    align?: TextAlign;
    truncate?: boolean;
    lineClamp?: number;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

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

  let {
    align,
    as = 'p',
    class: className,
    lineClamp,
    ref = $bindable(null),
    size,
    style,
    tone = 'default',
    truncate = false,
    weight,
    ...props
  }: TextRootProps = $props();

  const resolvedSize = $derived(size ?? (as === 'small' ? 'sm' : 'md'));
  const resolvedWeight = $derived(weight ?? (as === 'strong' ? 'semibold' : 'regular'));
  const clamp = $derived(
    Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined,
  );
  const textClass = $derived(
    cn(
      textVariants({
        size: resolvedSize,
        weight: resolvedWeight,
        tone,
        align,
        truncate,
        lineClamp: clamp !== undefined,
      }),
      className,
    ),
  );
</script>

<Ark
  as={as as 'p'}
  {...props}
  bind:ref
  class={textClass}
  style={clamp === undefined
    ? style
    : [style, `-webkit-line-clamp:${clamp}`].filter(Boolean).join(';')}
  data-scope="text"
  data-part="root"
  data-slot="text-root"
  data-size={resolvedSize}
  data-weight={resolvedWeight}
  data-tone={tone}
  data-align={align}
  data-truncate={truncate ? '' : undefined}
  data-line-clamp={clamp === undefined ? undefined : ''}
/>