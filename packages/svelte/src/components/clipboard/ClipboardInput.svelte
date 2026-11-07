<script lang="ts">
  import { ClipboardInput, type ClipboardInputProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ClipboardInputProps = $props();
</script>

<ClipboardInput
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.input, className)}
  data-slot="clipboard-input"
/>