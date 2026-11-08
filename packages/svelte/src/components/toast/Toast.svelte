<script lang="ts">
  import { ToastRoot, type ToastRootProps } from '@ark-ui/svelte/toast';
  import { clsx } from 'clsx';
  import styles from './Toast.module.css';

  let { class: className, ref = $bindable(null), ...props }: ToastRootProps = $props();
</script>

<ToastRoot {...props} bind:ref class={clsx(styles.root, className)} data-slot="toast-root" />