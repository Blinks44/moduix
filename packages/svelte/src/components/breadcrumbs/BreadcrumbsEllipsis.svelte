<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { EllipsisIcon } from '@/lib/moduix/icons/ui';
  import styles from './Breadcrumbs.module.css';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { asChild, children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.ellipsis, className)}
  aria-hidden="true"
  data-slot="breadcrumbs-ellipsis"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <EllipsisIcon class={styles.ellipsisIcon} />
  {/if}
</Ark>