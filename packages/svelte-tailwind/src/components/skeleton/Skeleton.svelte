<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type SkeletonVariant = 'pulse' | 'none';

  export interface SkeletonRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    loading?: boolean;
    variant?: SkeletonVariant;
    width?: number | string;
    height?: number | string;
    boxSize?: number | string;
    borderRadius?: number | string;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let {
    borderRadius,
    boxSize,
    class: className,
    height,
    loading = true,
    ref = $bindable(null),
    style,
    variant = 'pulse',
    width,
    'aria-hidden': ariaHidden,
    ...props
  }: SkeletonRootProps = $props();

  const toCssValue = (value: number | string | undefined) =>
    typeof value === 'number' ? `${value}px` : value;

  const skeletonStyle = $derived(
    [
      ['width', toCssValue(width ?? boxSize)],
      ['height', toCssValue(height ?? boxSize)],
      ['border-radius', toCssValue(borderRadius)],
    ]
      .flatMap(([property, value]) => (value == null ? [] : [`${property}:${value}`]))
      .concat(style ? [style] : [])
      .join(';') || undefined,
  );
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  aria-hidden={ariaHidden ?? (loading ? true : undefined)}
  data-scope="skeleton"
  data-part="root"
  data-slot="skeleton-root"
  data-state={loading ? 'loading' : 'loaded'}
  data-loading={loading ? '' : undefined}
  data-variant={variant}
  class={cn(
    'block w-full rounded-md',
    loading &&
      'pointer-events-none h-4 overflow-hidden bg-[color-mix(in_oklab,var(--color-muted-foreground)_18%,var(--color-background))] text-transparent select-none before:invisible after:invisible [&_*]:invisible',
    loading && variant === 'pulse' && 'animate-(--moduix-animation-pulse)',
    className,
  )}
  style={skeletonStyle}
/>