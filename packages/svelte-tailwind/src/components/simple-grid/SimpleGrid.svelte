<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SimpleGridRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    columns?: number;
    minChildWidth?: number | string;
    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    columnGap,
    columns,
    gap,
    minChildWidth,
    ref = $bindable(null),
    rowGap,
    style,
    ...props
  }: SimpleGridRootProps = $props();

  const toCssLength = (value: number | string) =>
    typeof value === 'number' ? `${value}px` : value;

  // Only set what was passed: an empty `row-gap` after `gap` would reset part of the shorthand.
  const gridStyle = $derived(
    [
      minChildWidth != null
        ? `grid-template-columns:repeat(auto-fit, minmax(min(100%, ${toCssLength(minChildWidth)}), 1fr))`
        : columns != null
          ? `grid-template-columns:repeat(${columns}, minmax(0, 1fr))`
          : undefined,
      gap != null ? `gap:${toCssLength(gap)}` : undefined,
      rowGap != null ? `row-gap:${toCssLength(rowGap)}` : undefined,
      columnGap != null ? `column-gap:${toCssLength(columnGap)}` : undefined,
      style,
    ]
      .filter(Boolean)
      .join(';'),
  );
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn('grid grid-cols-1', className)}
  style={gridStyle}
  data-scope="simple-grid"
  data-part="root"
  data-slot="simple-grid-root"
/>