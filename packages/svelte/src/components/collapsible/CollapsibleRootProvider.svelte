<script lang="ts">
  import {
    CollapsibleRootProvider,
    type CollapsibleRootProviderProps,
  } from '@ark-ui/svelte/collapsible';
  import { clsx } from 'clsx';
  import styles from './Collapsible.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleRootProviderProps = $props();
</script>

<CollapsibleRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="collapsible-root-provider"
/>