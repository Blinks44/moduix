<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type SeparatorOrientation = 'horizontal' | 'vertical';
  export type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
  export type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

  export interface SeparatorRootProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    orientation?: SeparatorOrientation;
    size?: SeparatorSize;
    variant?: SeparatorVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const separatorVariants = cva('block shrink-0 m-0 border-border', {
    variants: {
      orientation: {
        horizontal: 'h-0 w-full',
        vertical: 'h-[1em] w-0',
      },
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
      },
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'xs', class: 'border-t-[0.5px]' },
      { orientation: 'horizontal', size: 'sm', class: 'border-t' },
      { orientation: 'horizontal', size: 'md', class: 'border-t-2' },
      { orientation: 'horizontal', size: 'lg', class: 'border-t-[3px]' },
      { orientation: 'vertical', size: 'xs', class: 'border-s-[0.5px]' },
      { orientation: 'vertical', size: 'sm', class: 'border-s' },
      { orientation: 'vertical', size: 'md', class: 'border-s-2' },
      { orientation: 'vertical', size: 'lg', class: 'border-s-[3px]' },
    ],
  });

  let {
    class: className,
    orientation = 'horizontal',
    ref = $bindable(null),
    role,
    size = 'sm',
    variant = 'solid',
    ...props
  }: SeparatorRootProps = $props();

  const resolvedRole = $derived(role ?? 'separator');
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(separatorVariants({ orientation, size, variant }), className)}
  role={resolvedRole}
  aria-orientation={resolvedRole === 'separator' ? orientation : undefined}
  data-scope="separator"
  data-part="root"
  data-slot="separator-root"
  data-orientation={orientation}
  data-size={size}
  data-variant={variant}
/>