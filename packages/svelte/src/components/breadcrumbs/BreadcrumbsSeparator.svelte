<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './Breadcrumbs.module.css';

  type Props = HTMLProps<'li'> & PolymorphicProps<'li'> & RefAttribute;

  let { asChild, children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.separator, className)}
  aria-hidden="true"
  data-slot="breadcrumbs-separator"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon class={styles.separatorIcon} />
  {/if}
</Ark>