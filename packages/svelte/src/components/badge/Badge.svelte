<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type BadgeSize = 'sm' | 'md' | 'lg';
  export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

  export interface BadgeRootProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    size?: BadgeSize;
    variant?: BadgeVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Badge.module.css';
  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant = 'default',
    ...props
  }: BadgeRootProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  data-scope="badge"
  data-part="root"
  data-slot="badge-root"
  data-size={size}
  data-variant={variant}
  class={clsx(styles.root, className)}
/>