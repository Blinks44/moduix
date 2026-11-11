<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type ButtonVariant =
    | 'default'
    | 'outline'
    | 'secondary'
    | 'destructive'
    | 'destructive-outline'
    | 'ghost'
    | 'link';
  export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

  export interface ButtonRootProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {
    'data-part'?: string;
    'data-scope'?: string;
    'data-slot'?: string;
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const buttonVariants = cva(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium no-underline appearance-none transition-[background-color,border-color,color,opacity,transform,translate] duration-fast ease-in-out select-none whitespace-nowrap focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:opacity-disabled motion-safe:[&[data-slot='button-root']:not([data-variant='link']):not([aria-haspopup]):active]:translate-y-px [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
    {
      variants: {
        variant: {
          default:
            'border-primary bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_88%,black)]',
          outline: 'border-border bg-background text-foreground hover:bg-accent',
          secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-accent',
          destructive:
            'border-destructive bg-destructive text-destructive-foreground hover:bg-[color-mix(in_srgb,var(--color-destructive)_88%,black)]',
          'destructive-outline':
            'border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
          ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent',
          link: 'border-transparent bg-transparent text-primary underline underline-offset-[0.25em] hover:text-foreground',
        },
        size: {
          xs: 'min-h-control-xs px-2.5 py-0.5 text-xs',
          sm: 'min-h-control-sm px-3 py-1 text-sm',
          md: 'min-h-control-md px-4 py-1 text-sm',
          lg: 'min-h-control-lg px-5 py-1.5 text-md',
          xl: 'min-h-control-xl px-6 py-2 text-lg',
          'icon-sm': 'size-control-sm min-w-control-sm gap-0 p-0',
          'icon-md': 'size-control-md min-w-control-md gap-0 p-0',
          'icon-lg': 'size-control-lg min-w-control-lg gap-0 p-0',
        },
      },
      compoundVariants: [{ variant: 'link', class: 'min-h-0 py-0' }],
      defaultVariants: {
        variant: 'default',
        size: 'md',
      },
    },
  );

  let {
    asChild,
    class: className,
    disabled = false,
    loading = false,
    onclickcapture,
    ref = $bindable(null),
    size = 'md',
    type,
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    'data-part': dataPart = 'root',
    'data-scope': dataScope = 'button',
    'data-slot': dataSlot = 'button-root',
    ...props
  }: ButtonRootProps = $props();

  const isDisabled = $derived(
    !!disabled || loading || ariaDisabled === true || ariaDisabled === 'true',
  );

  const handleClickCapture: ButtonRootProps['onclickcapture'] = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onclickcapture?.(event);
  };
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {asChild}
  type={asChild ? type : (type ?? 'button')}
  disabled={asChild ? undefined : isDisabled}
  aria-busy={loading ? true : ariaBusy}
  aria-disabled={isDisabled ? true : ariaDisabled}
  onclickcapture={handleClickCapture}
  data-scope={dataScope}
  data-part={dataPart}
  data-slot={dataSlot}
  data-variant={variant}
  data-size={size}
  data-disabled={isDisabled ? '' : undefined}
  data-loading={loading ? '' : undefined}
  class={cn(buttonVariants({ variant, size }), className)}
/>