<script lang="ts">
  import { ClipboardRootProvider, type ClipboardRootProviderProps } from '@ark-ui/svelte/clipboard';
  import { clsx } from 'clsx';
  import styles from './Clipboard.module.css';

  let { class: className, ref = $bindable(null), ...props }: ClipboardRootProviderProps = $props();
</script>

<ClipboardRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="clipboard-root-provider"
/>