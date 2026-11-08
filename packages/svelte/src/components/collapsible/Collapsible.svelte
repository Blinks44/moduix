<script lang="ts">
  import { CollapsibleRoot, type CollapsibleRootProps } from '@ark-ui/svelte/collapsible';
  import { clsx } from 'clsx';
  import styles from './Collapsible.module.css';

  let {
    class: className,
    open = $bindable(),
    ref = $bindable(null),
    ...props
  }: CollapsibleRootProps = $props();
</script>

<CollapsibleRoot
  {...props}
  bind:ref
  bind:open
  class={clsx(styles.root, className)}
  data-slot="collapsible-root"
/>