<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type CardSize = 'sm' | 'md' | 'lg';
  export type CardVariant = 'elevated' | 'outline' | 'subtle';

  export interface CardRootProps extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    size?: CardSize;
    variant?: CardVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const cardRootVariants = cva(
    [
      'group/card moduix-card-interactive-elevation relative flex w-full min-w-0 flex-col rounded-lg text-card-foreground',
      'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring',
      'has-[>[data-slot=card-background]]:isolate',
    ],
    {
      variants: {
        size: {
          sm: '[--card-spacing:var(--moduix-spacing-4)]',
          md: '[--card-spacing:var(--moduix-spacing-6)]',
          lg: '[--card-spacing:var(--moduix-spacing-8)]',
        },
        variant: {
          elevated: 'border-0 bg-card shadow-md',
          outline: 'border border-border bg-card',
          subtle: 'border-0 bg-muted',
        },
      },
      defaultVariants: {
        size: 'md',
        variant: 'outline',
      },
    },
  );

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant = 'outline',
    ...props
  }: CardRootProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(cardRootVariants({ size, variant }), className)}
  data-scope="card"
  data-part="root"
  data-size={size}
  data-variant={variant}
  data-slot="card-root"
/>