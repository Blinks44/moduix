<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  export type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

  export interface ContainerRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    gutter?: ContainerGutter;
    size?: ContainerSize;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const containerVariants = cva(
    'mx-auto w-full min-w-0 max-w-[calc(var(--_container-max-width)_+_var(--_container-gutter)*2)] px-(--_container-gutter)',
    {
      variants: {
        size: {
          xs: '[--_container-max-width:40rem]',
          sm: '[--_container-max-width:48rem]',
          md: '[--_container-max-width:64rem]',
          lg: '[--_container-max-width:72rem]',
          xl: '[--_container-max-width:90rem]',
          full: 'max-w-none',
        },
        gutter: {
          none: '[--_container-gutter:0px]',
          sm: '[--_container-gutter:clamp(var(--moduix-spacing-3),3vw,var(--moduix-spacing-6))]',
          md: '[--_container-gutter:clamp(var(--moduix-spacing-4),4vw,var(--moduix-spacing-8))]',
          lg: '[--_container-gutter:clamp(var(--moduix-spacing-6),5vw,3rem)]',
        },
      },
      defaultVariants: {
        size: 'lg',
        gutter: 'md',
      },
    },
  );

  let {
    class: className,
    gutter = 'md',
    ref = $bindable(null),
    size = 'lg',
    ...props
  }: ContainerRootProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(containerVariants({ size, gutter }), className)}
  data-scope="container"
  data-part="root"
  data-slot="container-root"
  data-size={size}
  data-gutter={gutter}
/>