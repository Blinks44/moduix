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
  import { clsx } from 'clsx';
  import styles from './Skeleton.module.css';
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
  class={clsx(styles.root, className)}
  style={skeletonStyle}
/>