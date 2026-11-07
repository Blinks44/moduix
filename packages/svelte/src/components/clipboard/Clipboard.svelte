<script lang="ts">
  import { ClipboardRoot, type ClipboardRootProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: ClipboardRootProps = $props();
</script>

<ClipboardRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="clipboard-root"
/>