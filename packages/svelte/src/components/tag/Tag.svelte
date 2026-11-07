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
  import { clsx } from 'clsx';
  import styles from './Tag.module.css';

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
  class={clsx(styles.root, className)}
/>