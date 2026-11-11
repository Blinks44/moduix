<script lang="ts">
  import { ClipboardLabel, type ClipboardLabelProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let { class: className, ref = $bindable(null), ...props }: ClipboardLabelProps = $props();
</script>

<ClipboardLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="clipboard-label"
/>