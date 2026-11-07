<script lang="ts">
  import { ClipboardValueText, type ClipboardValueTextProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let { class: className, ref = $bindable(null), ...props }: ClipboardValueTextProps = $props();
</script>

<ClipboardValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="clipboard-value-text"
/>