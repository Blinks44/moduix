<script lang="ts">
  import { DialogContent, type DialogContentProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let { class: className, ref = $bindable(null), ...props }: DialogContentProps = $props();
</script>

<DialogContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="command-palette-content"
/>