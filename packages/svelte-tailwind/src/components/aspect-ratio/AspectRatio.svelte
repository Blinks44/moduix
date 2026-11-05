<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface AspectRatioRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    ratio?: number;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ratio = 1,
    ref = $bindable(null),
    style,
    ...props
  }: AspectRatioRootProps = $props();

  // Invalid ratios, such as `0 / 0` before media metadata loads, fall back to a square frame.
  const ratioValue = $derived(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
  const ratioStyle = $derived(
    [style, `--_aspect-ratio-value:${ratioValue}`].filter(Boolean).join(';'),
  );
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn('relative block aspect-(--_aspect-ratio-value) min-h-0 w-full', className)}
  style={ratioStyle}
  data-scope="aspect-ratio"
  data-part="root"
  data-slot="aspect-ratio-root"
/>