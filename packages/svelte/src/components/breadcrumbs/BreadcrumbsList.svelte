<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Breadcrumbs.module.css';

  type Props = HTMLProps<'ol'> & PolymorphicProps<'ol'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="ol"
  {...props}
  bind:ref
  class={clsx(styles.list, className)}
  data-slot="breadcrumbs-list"
/>