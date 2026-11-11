<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  export type TagSize = 'sm' | 'md' | 'lg';

  export interface TagRootProps extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    size?: TagSize;
    variant?: TagVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const tagVariants = cva(
    "inline-flex min-h-control-xs w-fit max-w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-0.5 align-middle font-medium text-xs whitespace-nowrap transition-colors duration-normal ease-in-out [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3 [&>svg]:shrink-0 [a&]:cursor-pointer [button&]:cursor-pointer",
    {
      variants: {
        variant: {
          default: 'border-transparent bg-primary text-primary-foreground',
          secondary: 'border-transparent bg-secondary text-secondary-foreground',
          outline: 'border-border bg-transparent text-foreground',
          ghost: 'border-transparent bg-transparent text-foreground',
          destructive: 'border-transparent bg-destructive text-destructive-foreground',
        },
        size: {
          sm: 'min-h-5 gap-1 px-1.5 py-0',
          md: '',
          lg: 'min-h-7 px-2.5 text-sm',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'md',
      },
    },
  );

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant = 'default',
    ...props
  }: TagRootProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  data-scope="tag"
  data-part="root"
  data-slot="tag-root"
  data-size={size}
  data-variant={variant}
  class={cn(tagVariants({ size, variant }), className)}
/>