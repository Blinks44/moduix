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
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import styles from './Spinner.module.css';
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
  class={clsx(styles.root, className)}
>
  <span
    data-scope="spinner"
    data-part="indicator"
    data-slot="spinner-indicator"
    class={styles.indicator}
    aria-hidden="true"
  >
    {#if children}
      {@render children()}
    {:else}
      <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" class={styles.ring}
      ></span>
    {/if}
  </span>
</Ark>