<script lang="ts">
  import { CollapsibleContent, type CollapsibleContentProps } from '@ark-ui/svelte/collapsible';
  import { clsx } from 'clsx';
  import styles from './Collapsible.module.css';

  let { class: className, ref = $bindable(null), ...props }: CollapsibleContentProps = $props();
</script>

<CollapsibleContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="collapsible-content"
/>