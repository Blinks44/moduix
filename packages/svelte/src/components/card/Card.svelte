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
  import { clsx } from 'clsx';
  import styles from './Card.module.css';
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
  class={clsx(styles.root, className)}
  data-scope="card"
  data-part="root"
  data-size={size}
  data-variant={variant}
  data-slot="card-root"
/>