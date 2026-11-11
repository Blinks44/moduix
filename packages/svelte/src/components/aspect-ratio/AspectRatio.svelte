<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface AspectRatioRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    ratio?: number;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './AspectRatio.module.css';
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
  class={clsx(styles.root, className)}
  style={ratioStyle}
  data-scope="aspect-ratio"
  data-part="root"
  data-slot="aspect-ratio-root"
/>