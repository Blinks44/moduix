<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface SpinnerRootProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    decorative?: boolean;
    size?: SpinnerSize;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';

  const spinnerVariants = cva('inline-flex shrink-0 items-center justify-center align-middle', {
    variants: {
      size: {
        inherit: 'size-[1em]',
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-7',
        xl: 'size-control-md',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  });

  let {
    asChild,
    children,
    class: className,
    decorative = false,
    ref = $bindable(null),
    size = 'md',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: SpinnerRootProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  {asChild}
  data-scope="spinner"
  data-part="root"
  data-slot="spinner-root"
  data-size={size}
  role={decorative ? undefined : 'status'}
  aria-hidden={decorative || undefined}
  aria-label={ariaLabel ?? (decorative || ariaLabelledby ? undefined : a11yLabels.loading)}
  aria-labelledby={ariaLabelledby}
  class={cn(spinnerVariants({ size }), className)}
>
  <span
    data-scope="spinner"
    data-part="indicator"
    data-slot="spinner-indicator"
    class="inline-flex size-full animate-(--moduix-animation-spin) items-center justify-center [&_svg]:size-full"
    aria-hidden="true"
  >
    {#if children}
      {@render children()}
    {:else}
      <span
        data-scope="spinner"
        data-part="ring"
        data-slot="spinner-ring"
        class="block size-full rounded-full border-2 border-solid border-current/[22%] [border-block-start-color:currentColor]"
      ></span>
    {/if}
  </span>
</Ark>