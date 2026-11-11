<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  export type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
  export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  export interface HeadingRootProps extends HTMLProps<'h1'>, PolymorphicProps<'h1'>, RefAttribute {
    as?: HeadingElement;
    size?: HeadingSize;
    weight?: HeadingWeight;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Heading.module.css';
  const defaultSizes: Record<HeadingElement, HeadingSize> = {
    h1: '2xl',
    h2: 'xl',
    h3: 'lg',
    h4: 'md',
    h5: 'sm',
    h6: 'xs',
  };

  let {
    as = 'h1',
    class: className,
    ref = $bindable(null),
    size,
    weight = 'semibold',
    ...props
  }: HeadingRootProps = $props();

  const resolvedSize = $derived(size ?? defaultSizes[as]);
</script>

<Ark
  as={as as 'h1'}
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-scope="heading"
  data-part="root"
  data-slot="heading-root"
  data-size={resolvedSize}
  data-weight={weight}
/>