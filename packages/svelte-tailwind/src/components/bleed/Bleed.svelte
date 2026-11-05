<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type BleedInline = BleedAmount | 'full';

  export interface BleedRootProps extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    block?: BleedAmount;
    inline?: BleedInline;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const bleedVariants = cva('', {
    variants: {
      inline: {
        none: null,
        xs: '-mx-1',
        sm: '-mx-2',
        md: '-mx-3',
        lg: '-mx-4',
        xl: '-mx-6',
        full: 'mx-[calc(50%_-_50vi)] [inline-size:100vi]',
      },
      block: {
        none: null,
        xs: '-my-1',
        sm: '-my-2',
        md: '-my-3',
        lg: '-my-4',
        xl: '-my-6',
      },
    },
    defaultVariants: {
      inline: 'full',
      block: 'none',
    },
  });

  let {
    block = 'none',
    class: className,
    inline = 'full',
    ref = $bindable(null),
    ...props
  }: BleedRootProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(bleedVariants({ inline, block }), className)}
  data-scope="bleed"
  data-part="root"
  data-slot="bleed-root"
  data-inline={inline}
  data-block={block}
/>