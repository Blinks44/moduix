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
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const headingVariants = cva('m-0 text-foreground tracking-normal text-balance wrap-anywhere', {
    variants: {
      size: {
        xs: 'text-sm',
        sm: 'text-md',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
        '2xl': 'text-3xl',
      },
      weight: {
        regular: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
  });

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
  class={cn(headingVariants({ size: resolvedSize, weight }), className)}
  data-scope="heading"
  data-part="root"
  data-slot="heading-root"
  data-size={resolvedSize}
  data-weight={weight}
/>