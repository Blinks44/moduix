<script lang="ts">
  import { ClipboardTrigger, type ClipboardTriggerProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ClipboardTriggerProps = $props();
</script>

<ClipboardTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="clipboard-trigger"
/>