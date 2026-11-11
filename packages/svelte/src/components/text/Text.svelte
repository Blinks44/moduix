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
  import { clsx } from 'clsx';
  import styles from './Text.module.css';

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
</script>

<Ark
  as={as as 'p'}
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
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