<script lang="ts">
  import { ClipboardControl, type ClipboardControlProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let { class: className, ref = $bindable(null), ...props }: ClipboardControlProps = $props();
</script>

<ClipboardControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="clipboard-control"
/>